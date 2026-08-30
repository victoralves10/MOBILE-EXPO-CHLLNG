import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authController, ErroSemConexao, ErroSenhaIncorreta } from "../controllers/authController";
import { usuarioService } from "../services/usuarioService";
import { consultaService } from "../services/consultaService";
import { animalService } from "../services/animalService";
import { useSenhaVisivel } from "./useSenhaVisivel";
import { toastErro, toastSucesso } from "../utils/toast";

function ehMesAtual(dataIso: string): boolean {
    const data = new Date(dataIso);
    const agora = new Date();
    return data.getMonth() === agora.getMonth() && data.getFullYear() === agora.getFullYear();
}

export function usePerfil() {
    const navigation = useNavigation<any>();
    const queryClient = useQueryClient();

    // dados do usuário — sempre buscados frescos da API, nunca de cópia local
    const usuarioQuery = useQuery({
        queryKey: ["usuario"],
        queryFn: () => usuarioService.buscarDados(),
    });
    const usuario = usuarioQuery.data ?? null;

    // consultas e animais, direto da API — usados pra calcular os KPIs
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

    // os 4 KPIs simples
    const consultasDoMes = consultas.filter((c) => ehMesAtual(c.dt_consulta)).length;
    const agendadas = consultas.filter((c) => c.st_consulta === "Agendado").length;
    const atrasadas = consultas.filter((c) => c.st_consulta === "Atrasado").length;
    const totalPacientes = animais.length;

    // taxa de retorno: % de pacientes com 2 ou mais consultas registradas
    const consultasPorAnimal = new Map<number, number>();
    for (const c of consultas) {
        consultasPorAnimal.set(c.id_animal, (consultasPorAnimal.get(c.id_animal) ?? 0) + 1);
    }
    const pacientesComRetorno = [...consultasPorAnimal.values()].filter((qtd) => qtd >= 2).length;
    const taxaRetorno = totalPacientes > 0 ? Math.round((pacientesComRetorno / totalPacientes) * 100) : 0;

    const inicial = usuario?.nm_usuario?.charAt(0).toUpperCase() ?? "?";

    // ---------- modal de editar dados ----------

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
            // invalida a query do usuário — o React Query já busca os dados novos sozinho
            queryClient.invalidateQueries({ queryKey: ["usuario"] });
            setModalEditarAberto(false);
        },
        onError: (error) => {
            if (error instanceof ErroSemConexao) {
                toastErro("Sem conexão com o servidor.");
            } else {
                toastErro("Não deu pra atualizar. Tenta de novo.");
            }
        },
    });

    function confirmarEdicao() {
        if (!nome.trim() || !email.trim()) return;
        mutationEditar.mutate({ nome: nome.trim(), email: email.trim(), senha: novaSenha || undefined });
    }

    // ---------- modal de apagar conta ----------

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
            navigation.reset({ index: 0, routes: [{ name: "Login" }] });
        },
        onError: (error) => {
            // fecha o modal de senha, senão o toast fica escondido atrás dele
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

    function confirmarApagarConta() {
        if (!senhaConfirmacao.trim()) return;
        setModalConfirmarApagarAberto(true);
    }

    function executarApagarConta() {
        setModalConfirmarApagarAberto(false);
        mutationApagar.mutate(senhaConfirmacao);
    }

    // ---------- sair ----------

    const [modalSairAberto, setModalSairAberto] = useState(false);

    function sair() {
        authController.fazerLogout();
        navigation.reset({ index: 0, routes: [{ name: "Login" }] });
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