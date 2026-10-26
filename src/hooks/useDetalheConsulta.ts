import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { consultaService } from "../services/consultaService";
import { mensagemDeErro } from "../services/api";
import { DadosConsulta } from "../models/Consulta";
import { toastErro, toastSucesso } from "../utils/toast";

// lógica da tela de detalhe da consulta: mostrar, editar e remover
export function useDetalheConsulta() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const queryClient = useQueryClient();

    const { id_consulta } = route.params;

    // tudo numa requisição só: consulta + animal + responsável, já formatados
    const consultaQuery = useQuery({
        queryKey: ["consultas", "detalhe", id_consulta],
        queryFn: () => consultaService.buscarDetalhe(id_consulta),
    });
    const consulta = consultaQuery.data ?? null;

    // depois de editar ou remover, recarrega as listas que mostram essa consulta
    function recarregarListas() {
        queryClient.invalidateQueries({ queryKey: ["consultas"] });
        queryClient.invalidateQueries({ queryKey: ["pacientes"] });
    }

    // ---------- editar ----------

    const [modalEditarAberto, setModalEditarAberto] = useState(false);
    const [form, setForm] = useState<DadosConsulta>({
        historico_consulta: "",
        dt_consulta: "",
        hr_consulta: "",
        st_consulta: "Agendado",
    });

    // atalho pra atualizar um campo: mudar("hr_consulta")("09:30")
    function mudar<C extends keyof DadosConsulta>(campo: C) {
        return (valor: DadosConsulta[C]) => setForm((atual) => ({ ...atual, [campo]: valor }));
    }

    // abre o modal já preenchido com o que veio do backend
    // atrasada aparece como "Agendar": se a data continuar no passado, o backend marca atrasada de novo
    function abrirModalEditar() {
        if (!consulta) return;
        setForm({
            historico_consulta: consulta.historico_consulta,
            dt_consulta: consulta.dt_consulta,
            hr_consulta: consulta.hr_consulta,
            st_consulta: consulta.st_consulta === "Concluido" ? "Concluido" : "Agendado",
        });
        setModalEditarAberto(true);
    }

    // salva e já coloca na tela a consulta que o backend devolveu
    const mutationAtualizar = useMutation({
        mutationFn: () => consultaService.atualizar(id_consulta, form),
        onSuccess: (resposta) => {
            toastSucesso(resposta.mensagem);
            queryClient.setQueryData(["consultas", "detalhe", id_consulta], resposta.consulta);
            recarregarListas();
            setModalEditarAberto(false);
        },
        // deu erro: mostra a mensagem do backend e deixa o modal aberto pra corrigir
        onError: (erro) => toastErro(mensagemDeErro(erro)),
    });

    // ---------- remover ----------

    const [confirmarRemoverAberto, setConfirmarRemoverAberto] = useState(false);

    // remove e volta pra tela anterior
    const mutationRemover = useMutation({
        mutationFn: () => consultaService.remover(id_consulta),
        onSuccess: (resposta) => {
            toastSucesso(resposta.mensagem);
            recarregarListas();
            navigation.goBack();
        },
        onError: (erro) => toastErro(mensagemDeErro(erro)),
    });

    function confirmarRemover() {
        setConfirmarRemoverAberto(false);
        mutationRemover.mutate();
    }

    // abre a ficha do paciente dessa consulta
    function abrirFichaPaciente() {
        if (consulta) navigation.navigate("DetalhePaciente", { id_animal: consulta.animal.id_animal });
    }

    return {
        consulta,
        carregando: consultaQuery.isLoading,
        erro: consultaQuery.isError ? mensagemDeErro(consultaQuery.error) : null,
        abrirFichaPaciente,

        modalEditarAberto,
        abrirModalEditar,
        fecharModalEditar: () => setModalEditarAberto(false),
        form,
        mudar,
        salvar: () => mutationAtualizar.mutate(),
        salvando: mutationAtualizar.isPending,

        confirmarRemoverAberto,
        abrirConfirmarRemover: () => setConfirmarRemoverAberto(true),
        fecharConfirmarRemover: () => setConfirmarRemoverAberto(false),
        confirmarRemover,
        removendo: mutationRemover.isPending,
    };
}