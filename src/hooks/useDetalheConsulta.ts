import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { consultaService } from "../services/consultaService";
import { catalogoService } from "../services/catalogoService";
import { mensagemDeErro } from "../services/api";
import { reagendarConsulta, cancelarLembrete } from "../services/notificacoes";
import { DadosConsulta } from "../models/Consulta";
import { toastErro, toastSucesso } from "../utils/toast";

const FORM_VAZIO: DadosConsulta = {
    historico_consulta: "",
    dt_consulta: "",
    hr_consulta: "",
    st_consulta: "Agendado",
    ds_doenca: null,
};

// lógica do detalhe da consulta
export function useDetalheConsulta() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const queryClient = useQueryClient();
    const { id_consulta } = route.params;

    const consultaQuery = useQuery({
        queryKey: ["consultas", "detalhe", id_consulta],
        queryFn: () => consultaService.buscarDetalhe(id_consulta),
    });
    const doencasQuery = useQuery({ queryKey: ["catalogo", "doencas"], queryFn: catalogoService.doencas, staleTime: Infinity });
    const consulta = consultaQuery.data ?? null;

    // recarrega as listas que mostram a consulta
    function recarregarListas() {
        queryClient.invalidateQueries({ queryKey: ["consultas"] });
        queryClient.invalidateQueries({ queryKey: ["pacientes"] });
    }

    // ---------- editar ----------

    const [modalEditarAberto, setModalEditarAberto] = useState(false);
    const [form, setForm] = useState<DadosConsulta>(FORM_VAZIO);

    function mudar<C extends keyof DadosConsulta>(campo: C) {
        return (valor: DadosConsulta[C]) => setForm((atual) => ({ ...atual, [campo]: valor }));
    }

    function abrirModalEditar() {
        if (!consulta) return;
        setForm(consulta.formulario);
        setModalEditarAberto(true);
    }

    const mutationAtualizar = useMutation({
        mutationFn: () => consultaService.atualizar(id_consulta, form),
        onSuccess: (resposta) => {
            toastSucesso(resposta.mensagem);
            queryClient.setQueryData(["consultas", "detalhe", id_consulta], resposta.consulta);
            reagendarConsulta(id_consulta, resposta.lembretes);
            recarregarListas();
            setModalEditarAberto(false);
        },
        onError: (erro) => toastErro(mensagemDeErro(erro)),
    });

    // ---------- remover ----------

    const [confirmarRemoverAberto, setConfirmarRemoverAberto] = useState(false);

    const mutationRemover = useMutation({
        mutationFn: () => consultaService.remover(id_consulta),
        onSuccess: (resposta) => {
            toastSucesso(resposta.mensagem);
            cancelarLembrete(id_consulta);
            recarregarListas();
            navigation.goBack();
        },
        onError: (erro) => toastErro(mensagemDeErro(erro)),
    });

    function confirmarRemover() {
        setConfirmarRemoverAberto(false);
        mutationRemover.mutate();
    }

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
        doencas: doencasQuery.data ?? [],
        salvar: () => mutationAtualizar.mutate(),
        salvando: mutationAtualizar.isPending,

        confirmarRemoverAberto,
        abrirConfirmarRemover: () => setConfirmarRemoverAberto(true),
        fecharConfirmarRemover: () => setConfirmarRemoverAberto(false),
        confirmarRemover,
        removendo: mutationRemover.isPending,
    };
}
