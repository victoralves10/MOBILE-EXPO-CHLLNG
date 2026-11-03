import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pacienteService } from "../services/pacienteService";
import { catalogoService } from "../services/catalogoService";
import { mensagemDeErro } from "../services/api";
import { cancelarLembrete } from "../services/notificacoes";
import { FormularioPaciente } from "../models/Paciente";
import { toastErro, toastSucesso } from "../utils/toast";

const FORM_VAZIO: FormularioPaciente = {
    nm_animal: "",
    especie_animal: "",
    raca_animal: "",
    dt_nascimento_animal: "",
    peso_animal: "",
    rg_animal: "",
    nr_microchip_animal: "",
    nm_responsavel: "",
    cpf_responsavel: "",
    nr_telefone_responsavel: "",
    id_regiao: null,
};

// lógica da ficha do paciente
export function useDetalhePaciente() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const queryClient = useQueryClient();
    const { id_animal } = route.params;

    const fichaQuery = useQuery({
        queryKey: ["pacientes", "ficha", id_animal],
        queryFn: () => pacienteService.buscarFicha(id_animal),
    });
    const regioesQuery = useQuery({ queryKey: ["catalogo", "regioes"], queryFn: catalogoService.regioes, staleTime: Infinity });
    const ficha = fichaQuery.data ?? null;

    // recarrega as listas que mostram o paciente
    function recarregarListas() {
        queryClient.invalidateQueries({ queryKey: ["pacientes"] });
        queryClient.invalidateQueries({ queryKey: ["consultas"] });
    }

    // ---------- editar ----------

    const [modalEditarAberto, setModalEditarAberto] = useState(false);
    const [form, setForm] = useState<FormularioPaciente>(FORM_VAZIO);

    function mudar<C extends keyof FormularioPaciente>(campo: C) {
        return (valor: FormularioPaciente[C]) => setForm((atual) => ({ ...atual, [campo]: valor }));
    }

    function abrirModalEditar() {
        if (!ficha) return;
        setForm(ficha.formulario);
        setModalEditarAberto(true);
    }

    const mutationAtualizar = useMutation({
        mutationFn: () =>
            pacienteService.atualizar(id_animal, {
                animal: {
                    nm_animal: form.nm_animal,
                    especie_animal: form.especie_animal,
                    raca_animal: form.raca_animal,
                    dt_nascimento_animal: form.dt_nascimento_animal,
                    peso_animal: form.peso_animal,
                    rg_animal: form.rg_animal,
                    nr_microchip_animal: form.nr_microchip_animal,
                },
                responsavel: {
                    nm_responsavel: form.nm_responsavel,
                    cpf_responsavel: form.cpf_responsavel,
                    nr_telefone_responsavel: form.nr_telefone_responsavel,
                    id_regiao: form.id_regiao,
                },
            }),
        onSuccess: (resposta) => {
            toastSucesso(resposta.mensagem);
            queryClient.setQueryData(["pacientes", "ficha", id_animal], resposta.paciente);
            recarregarListas();
            setModalEditarAberto(false);
        },
        onError: (erro) => toastErro(mensagemDeErro(erro)),
    });

    // ---------- remover ----------

    const [confirmarRemoverAberto, setConfirmarRemoverAberto] = useState(false);

    const mutationRemover = useMutation({
        mutationFn: () => pacienteService.remover(id_animal),
        onSuccess: (resposta) => {
            toastSucesso(resposta.mensagem);
            resposta.consultas_removidas.forEach(cancelarLembrete);
            recarregarListas();
            navigation.goBack();
        },
        onError: (erro) => toastErro(mensagemDeErro(erro)),
    });

    function confirmarRemover() {
        setConfirmarRemoverAberto(false);
        mutationRemover.mutate();
    }

    return {
        ficha,
        carregando: fichaQuery.isLoading,
        erro: fichaQuery.isError ? mensagemDeErro(fichaQuery.error) : null,
        abrirDetalheConsulta: (id_consulta: number) => navigation.navigate("DetalheConsulta", { id_consulta }),

        modalEditarAberto,
        abrirModalEditar,
        fecharModalEditar: () => setModalEditarAberto(false),
        form,
        mudar,
        regioes: regioesQuery.data ?? [],
        salvar: () => mutationAtualizar.mutate(),
        salvando: mutationAtualizar.isPending,

        confirmarRemoverAberto,
        abrirConfirmarRemover: () => setConfirmarRemoverAberto(true),
        fecharConfirmarRemover: () => setConfirmarRemoverAberto(false),
        confirmarRemover,
        removendo: mutationRemover.isPending,
    };
}
