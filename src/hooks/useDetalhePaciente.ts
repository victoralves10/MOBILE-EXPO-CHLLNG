import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pacienteService } from "../services/pacienteService";
import { catalogoService } from "../services/catalogoService";
import { mensagemDeErro } from "../services/api";
import { toastErro, toastSucesso } from "../utils/toast";

// todos os campos do modal de edição num objeto só
const FORM_VAZIO = {
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
    id_regiao: null as number | null,
};

type Formulario = typeof FORM_VAZIO;

// lógica da ficha do paciente: mostrar, editar e remover
export function useDetalhePaciente() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const queryClient = useQueryClient();

    const { id_animal } = route.params;

    // tudo numa requisição só: animal + responsável + histórico de consultas
    const fichaQuery = useQuery({
        queryKey: ["pacientes", "ficha", id_animal],
        queryFn: () => pacienteService.buscarFicha(id_animal),
    });
    const ficha = fichaQuery.data ?? null;

    // regiões pro seletor do responsável (carrega uma vez só)
    const regioesQuery = useQuery({ queryKey: ["catalogo", "regioes"], queryFn: catalogoService.regioes, staleTime: Infinity });

    // depois de editar ou remover, recarrega as listas que mostram esse paciente
    function recarregarListas() {
        queryClient.invalidateQueries({ queryKey: ["pacientes"] });
        queryClient.invalidateQueries({ queryKey: ["consultas"] });
    }

    // ---------- editar ----------

    const [modalEditarAberto, setModalEditarAberto] = useState(false);
    const [form, setForm] = useState<Formulario>(FORM_VAZIO);

    // atalho pra atualizar um campo: mudar("nm_animal")("Rex")
    function mudar<C extends keyof Formulario>(campo: C) {
        return (valor: Formulario[C]) => setForm((atual) => ({ ...atual, [campo]: valor }));
    }

    // abre o modal já preenchido com o que veio do backend
    function abrirModalEditar() {
        if (!ficha) return;
        const { animal, responsavel } = ficha;
        setForm({
            nm_animal: animal.nm_animal,
            especie_animal: animal.especie_animal,
            raca_animal: animal.raca_animal ?? "",
            dt_nascimento_animal: animal.dt_nascimento_animal ?? "",
            peso_animal: animal.peso_animal === null ? "" : String(animal.peso_animal).replace(".", ","),
            rg_animal: animal.rg_animal ?? "",
            nr_microchip_animal: animal.nr_microchip_animal ?? "",
            nm_responsavel: responsavel.nm_responsavel,
            cpf_responsavel: responsavel.cpf_responsavel_exibicao,
            nr_telefone_responsavel: responsavel.nr_telefone_responsavel_exibicao,
            id_regiao: responsavel.id_regiao,
        });
        setModalEditarAberto(true);
    }

    // manda animal e responsável juntos; o backend salva os dois de uma vez
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
        // deu erro (ex: CPF de outro responsável): mostra a mensagem e deixa o modal aberto
        onError: (erro) => toastErro(mensagemDeErro(erro)),
    });

    // ---------- remover ----------

    const [confirmarRemoverAberto, setConfirmarRemoverAberto] = useState(false);

    // remove e volta pra lista
    const mutationRemover = useMutation({
        mutationFn: () => pacienteService.remover(id_animal),
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

    function abrirDetalheConsulta(id_consulta: number) {
        navigation.navigate("DetalheConsulta", { id_consulta });
    }

    return {
        ficha,
        carregando: fichaQuery.isLoading,
        erro: fichaQuery.isError ? mensagemDeErro(fichaQuery.error) : null,
        abrirDetalheConsulta,

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