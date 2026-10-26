import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { usuarioService } from "../services/usuarioService";
import { authService } from "../services/authService";
import { mensagemDeErro } from "../services/api";
import { consultaService } from "../services/consultaService";
import { animalService } from "../services/animalService";
import { useSenhaVisivel } from "./useSenhaVisivel";
import { schemaEditarPerfil, schemaApagarConta } from "../validations/authValidations";
import { toastErro, toastSucesso } from "../utils/toast";

// (temporário) essa parte dos indicadores sai na feature do Perfil, vai vir pronta do backend
function ehMesAtual(dataIso: string): boolean {
    const data = new Date(dataIso);
    const agora = new Date();
    return data.getMonth() === agora.getMonth() && data.getFullYear() === agora.getFullYear();
}

// toda a lógica da tela de perfil
export function usePerfil() {
    const { encerrarSessao } = useAuth();
    const queryClient = useQueryClient();

    // dados do usuário logado
    const usuarioQuery = useQuery({
        queryKey: ["usuario"],
        queryFn: () => authService.perfil(),
    });
    const usuario = usuarioQuery.data ?? null;

    // (temporário) indicadores ainda no jeito antigo
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

    // letra do avatar já vem pronta do backend
    const inicial = usuario?.inicial_usuario ?? "?";

    // ---------- editar dados ----------

    const [modalEditarAberto, setModalEditarAberto] = useState(false);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const senhaVisivel = useSenhaVisivel();

    // abre o modal já preenchido com os dados atuais
    function abrirModalEditar() {
        setNome(usuario?.nm_usuario ?? "");
        setEmail(usuario?.email_usuario ?? "");
        setNovaSenha("");
        setModalEditarAberto(true);
    }

    function fecharModalEditar() {
        setModalEditarAberto(false);
    }

    // salva no backend e atualiza o usuário na tela com o que ele devolveu
    const mutationEditar = useMutation({
        mutationFn: ({ nome, email, senha }: { nome: string; email: string; senha?: string }) =>
            usuarioService.editar(nome, email, senha),
        onSuccess: (resposta) => {
            toastSucesso(resposta.mensagem);
            queryClient.setQueryData(["usuario"], resposta.usuario);
            setModalEditarAberto(false);
        },
        onError: (erro) => toastErro(mensagemDeErro(erro)),
    });

    // valida os campos antes de mandar
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

    // apaga no backend; deu certo sai do app, senha errada só mostra o aviso
    const mutationApagar = useMutation({
        mutationFn: (senha: string) => usuarioService.remover(senha),
        onSuccess: async (resposta) => {
            setModalApagarAberto(false);
            toastSucesso(resposta.mensagem);
            await encerrarSessao();
        },
        onError: (erro) => {
            setModalApagarAberto(false);
            toastErro(mensagemDeErro(erro));
        },
    });

    // confere se digitou a senha e abre a confirmação final
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

    // sair é só encerrar a sessão do contexto
    const sair = encerrarSessao;

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