import { useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";
import { usuarioService } from "../services/usuarioService";
import { painelService } from "../services/painelService";
import { mensagemDeErro } from "../services/api";
import { useSenhaVisivel } from "./useSenhaVisivel";
import { AbaConsulta } from "../models/Consulta";
import { toastErro, toastSucesso } from "../utils/toast";

// qual modal está aberto (só um por vez)
type ModalPerfil = "dados" | "senha" | "apagar" | null;

// lógica da tela de perfil: dados do usuário, números do consultório e ações da conta
export function usePerfil() {
    const navigation = useNavigation<any>();
    const queryClient = useQueryClient();
    const { encerrarSessao } = useAuth();

    // dados do usuário logado
    const usuarioQuery = useQuery({
        queryKey: ["usuario"],
        queryFn: () => authService.perfil(),
    });

    // números do consultório, todos calculados pelo backend
    const dashboardQuery = useQuery({
        queryKey: ["dashboard"],
        queryFn: () => painelService.dashboard(),
    });

    // sempre que volta pro Perfil, atualiza os números
    useFocusEffect(
        useCallback(() => {
            dashboardQuery.refetch();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    );

    const usuario = usuarioQuery.data ?? null;

    // ---------- atalhos (cada número leva pra tela certa) ----------

    function abrirConsultas(aba: AbaConsulta) {
        navigation.navigate("Consultas", { aba });
    }

    function abrirPacientes() {
        navigation.navigate("Pacientes");
    }

    // ---------- modais ----------

    const [modal, setModal] = useState<ModalPerfil>(null);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const senhaVisivel = useSenhaVisivel();

    // abre um modal já com os campos certos preenchidos
    function abrirModal(qual: Exclude<ModalPerfil, null>) {
        setNome(usuario?.nm_usuario ?? "");
        setEmail(usuario?.email_usuario ?? "");
        setSenha("");
        setModal(qual);
    }

    function fecharModal() {
        setModal(null);
        setSenha("");
    }

    // editar dados e alterar senha usam o mesmo endpoint (PUT /auth/perfil)
    const mutationEditar = useMutation({
        mutationFn: () => usuarioService.editar(nome.trim(), email.trim(), modal === "senha" ? senha : undefined),
        onSuccess: (resposta) => {
            toastSucesso(resposta.mensagem);
            queryClient.setQueryData(["usuario"], resposta.usuario);
            fecharModal();
        },
        // erro do backend (e-mail em uso, senha fraca...): mostra e deixa o modal aberto
        onError: (erro) => toastErro(mensagemDeErro(erro)),
    });

    // apagar conta: senha certa sai do app, senha errada só mostra o aviso
    const mutationApagar = useMutation({
        mutationFn: () => usuarioService.remover(senha),
        onSuccess: async (resposta) => {
            toastSucesso(resposta.mensagem);
            fecharModal();
            await encerrarSessao();
        },
        onError: (erro) => toastErro(mensagemDeErro(erro)),
    });

    return {
        usuario,
        dashboard: dashboardQuery.data ?? null,
        carregandoDashboard: dashboardQuery.isLoading,
        abrirConsultas,
        abrirPacientes,

        modal,
        abrirModal,
        fecharModal,
        nome,
        setNome,
        email,
        setEmail,
        senha,
        setSenha,
        senhaVisivel,
        salvar: () => mutationEditar.mutate(),
        salvando: mutationEditar.isPending,
        apagarConta: () => mutationApagar.mutate(),
        apagando: mutationApagar.isPending,

        // sair é direto, sem modal de confirmação
        sair: encerrarSessao,
    };
}