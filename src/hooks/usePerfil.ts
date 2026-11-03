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

type ModalPerfil = "dados" | "senha" | "apagar" | null;

// lógica da tela de perfil
export function usePerfil() {
    const navigation = useNavigation<any>();
    const queryClient = useQueryClient();
    const { encerrarSessao } = useAuth();

    const usuarioQuery = useQuery({ queryKey: ["usuario"], queryFn: authService.perfil });
    const dashboardQuery = useQuery({ queryKey: ["consultas", "dashboard"], queryFn: painelService.dashboard });
    const usuario = usuarioQuery.data ?? null;

    // recarrega ao voltar pro Perfil
    useFocusEffect(
        useCallback(() => {
            dashboardQuery.refetch();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    );

    // ---------- modais ----------

    const [modal, setModal] = useState<ModalPerfil>(null);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const senhaVisivel = useSenhaVisivel();

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

    // editar dados ou senha
    const mutationEditar = useMutation({
        mutationFn: () => usuarioService.editar(nome, email, modal === "senha" ? senha : undefined),
        onSuccess: (resposta) => {
            toastSucesso(resposta.mensagem);
            queryClient.setQueryData(["usuario"], resposta.usuario);
            fecharModal();
        },
        onError: (erro) => toastErro(mensagemDeErro(erro)),
    });

    // apagar conta
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
        abrirConsultas: (aba: AbaConsulta) => navigation.navigate("Consultas", { aba }),
        abrirPacientes: () => navigation.navigate("Pacientes"),
        abrirSobre: () => navigation.navigate("SobreApp"),

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
        sair: encerrarSessao,
    };
}
