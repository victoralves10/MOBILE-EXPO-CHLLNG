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

    // Dados do usuário buscados diretamente do backend
    const usuarioQuery = useQuery({
        queryKey: ["usuario"],
        queryFn: () => usuarioService.buscarDados(),
    });
    const usuario = usuarioQuery.data ?? null;

    // Consultas e animais para KPIs
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

    // ---------- Modal Editar ----------
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
            toastSucesso("Dados atualizados com sucesso!");
            queryClient.invalidateQueries({ queryKey: ["usuario"] });
            setModalEditarAberto(false);
        },
        onError: (error) => {
            if (error instanceof ErroSemConexao) {
                toastErro("Sem conexão com o servidor.");
            } else {
                toastErro("Não foi possível atualizar o perfil.");
            }
        },
    });

    function confirmarEdicao() {
        if (!nome.trim() || !email.trim()) {
            toastErro("Preencha nome e e-mail.");
            return;
        }
        mutationEditar.mutate({ nome: nome.trim(), email: email.trim(), senha: novaSenha || undefined });
    }

    // ---------- Modal Apagar Conta ----------
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
            queryClient.clear(); // Limpa todo o cache de consultas/pacientes
            toastSucesso("Conta removida com sucesso.");
            navigation.reset({ index: 0, routes: [{ name: "Login" }] });
        },
        onError: (error) => {
            setModalApagarAberto(false);
            if (error instanceof ErroSenhaIncorreta) {
                toastErro("Senha incorreta.");
            } else if (error instanceof ErroSemConexao) {
                toastErro("Sem conexão com o servidor.");
            } else {
                toastErro("Erro ao excluir conta.");
            }
        },
    });

    function confirmarApagarConta() {
        if (!senhaConfirmacao.trim()) {
            toastErro("Informe sua senha para confirmar.");
            return;
        }
        setModalConfirmarApagarAberto(true);
    }

    function executarApagarConta() {
        setModalConfirmarApagarAberto(false);
        mutationApagar.mutate(senhaConfirmacao);
    }

    // ---------- Logout seguro ----------
    const [modalSairAberto, setModalSairAberto] = useState(false);

    async function sair() {
        await authController.fazerLogout();
        queryClient.clear(); // Garante limpeza total de cache no logout
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