import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authController, ErroSemConexao, ErroSenhaIncorreta } from "../controllers/authController";
import { useAuth } from "../context/AuthContext";
import { usuarioService } from "../services/usuarioService";
import { consultaService } from "../services/consultaService";
import { animalService } from "../services/animalService";
import { useSenhaVisivel } from "./useSenhaVisivel";
import { schemaEditarPerfil, schemaApagarConta } from "../validations/authValidations";
import { toastErro, toastSucesso } from "../utils/toast";

function ehMesAtual(dataIso: string): boolean {
    const data = new Date(dataIso);
    const agora = new Date();
    return data.getMonth() === agora.getMonth() && data.getFullYear() === agora.getFullYear();
}

export function usePerfil() {
    const { sair: sairDoAuthContext } = useAuth();
    const queryClient = useQueryClient();

    const usuarioQuery = useQuery({
        queryKey: ["usuario"],
        queryFn: () => usuarioService.buscarDados(),
    });
    const usuario = usuarioQuery.data ?? null;

    const consultasQuery = useQuery({
        queryKey: ["consultas"],
        queryFn: () => consultaService.listar(),
    });

    const animaisQuery = useQuery({
        queryKey: ["animais"],
        queryFn: () => animalService.listar(),
    });

    const consultas = consultasQuery.data ?? [];
    const animais = animaisQuery.data ?? [];
    const carregandoKpis = consultasQuery.isLoading || animaisQuery.isLoading;

    const consultasDoMes = consultas.filter((c) => ehMesAtual(c.dt_consulta)).length;
    const agendadas = consultas.filter((c) => c.st_consulta === "Agendado").length;
    const atrasadas = consultas.filter((c) => c.st_consulta === "Atrasado").length;
    const totalPacientes = animais.length;

    const consultasPorAnimal = new Map<number, number>();
    for (const c of consultas) {
        consultasPorAnimal.set(c.id_animal, (consultasPorAnimal.get(c.id_animal) ?? 0) + 1);
    }
    const pacientesComRetorno = [...consultasPorAnimal.values()].filter((qtd) => qtd >= 2).length;
    const taxaRetorno = totalPacientes > 0 ? Math.round((pacientesComRetorno / totalPacientes) * 100) : 0;

    const inicial = usuario?.nm_usuario?.charAt(0).toUpperCase() ?? "?";

    // ---------- editar dados ----------

    const [modalEditarAberto, setModalEditarAberto] = useState(false);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const senhaVisivel = useSenhaVisivel();

    function abrirModalEditar() {
        setNome(usuario?.nm_usuario ?? "");
        setEmail(usuario?.email_usuario ?? "");
        setNovaSenha("");
        setModalEditarAberto(true);
    }

    function fecharModalEditar() {
        setModalEditarAberto(false);
    }

    const mutationEditar = useMutation({
        mutationFn: ({ nome, email, senha }: { nome: string; email: string; senha?: string }) =>
            authController.atualizarPerfil(nome, email, senha),
        onSuccess: () => {
            toastSucesso("Dados atualizados.");
            queryClient.invalidateQueries({ queryKey: ["usuario"] });
            setModalEditarAberto(false);
        },
        onError: (error) => {
            console.error("[usePerfil.confirmarEdicao]", error);
            if (error instanceof ErroSemConexao) {
                toastErro("Sem conexão com o servidor.");
            } else {
                toastErro("Não deu pra atualizar. Tenta de novo.");
            }
        },
    });

    async function confirmarEdicao() {
        try {
            await schemaEditarPerfil.validate({ nome, email, novaSenha });
        } catch (erro: any) {
            toastErro(erro.message);
            return;
        }
        mutationEditar.mutate({ nome: nome.trim(), email: email.trim(), senha: novaSenha || undefined });
    }

    // ---------- apagar conta ----------

    const [modalApagarAberto, setModalApagarAberto] = useState(false);
    const [modalConfirmarApagarAberto, setModalConfirmarApagarAberto] = useState(false);
    const [senhaConfirmacao, setSenhaConfirmacao] = useState("");
    const senhaConfirmacaoVisivel = useSenhaVisivel();

    function abrirModalApagar() {
        setSenhaConfirmacao("");
        setModalApagarAberto(true);
    }

    function fecharModalApagar() {
        setModalApagarAberto(false);
        setSenhaConfirmacao("");
    }

    const mutationApagar = useMutation({
        mutationFn: (senha: string) => authController.apagarConta(senha),
        onSuccess: () => {
            setModalApagarAberto(false);
            toastSucesso("Conta apagada.");
            sairDoAuthContext();
        },
        onError: (error) => {
            console.error("[usePerfil.executarApagarConta]", error);
            setModalApagarAberto(false);
            if (error instanceof ErroSenhaIncorreta) {
                toastErro("Senha incorreta.");
            } else if (error instanceof ErroSemConexao) {
                toastErro("Sem conexão com o servidor.");
            } else {
                toastErro("Não deu pra apagar a conta. Tenta de novo.");
            }
        },
    });

    async function confirmarApagarConta() {
        try {
            await schemaApagarConta.validate({ senha: senhaConfirmacao });
        } catch (erro: any) {
            toastErro(erro.message);
            return;
        }
        setModalConfirmarApagarAberto(true);
    }

    function executarApagarConta() {
        setModalConfirmarApagarAberto(false);
        mutationApagar.mutate(senhaConfirmacao);
    }

    // ---------- sair ----------

    const [modalSairAberto, setModalSairAberto] = useState(false);

    function sair() {
        sairDoAuthContext();
    }

    return {
        usuario,
        inicial,
        consultasDoMes,
        agendadas,
        atrasadas,
        totalPacientes,
        taxaRetorno,
        carregandoKpis,

        modalSairAberto,
        setModalSairAberto,
        sair,

        modalEditarAberto,
        abrirModalEditar,
        fecharModalEditar,
        nome,
        setNome,
        email,
        setEmail,
        novaSenha,
        setNovaSenha,
        senhaVisivel,
        confirmarEdicao,
        editandoPerfil: mutationEditar.isPending,

        modalApagarAberto,
        abrirModalApagar,
        fecharModalApagar,
        senhaConfirmacao,
        setSenhaConfirmacao,
        senhaConfirmacaoVisivel,
        confirmarApagarConta,
        modalConfirmarApagarAberto,
        setModalConfirmarApagarAberto,
        executarApagarConta,
        apagandoConta: mutationApagar.isPending,
    };
}
