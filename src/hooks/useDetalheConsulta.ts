import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { consultaController } from "../controllers/consultaController";
import { pacienteController } from "../controllers/pacienteController";
import { StatusConsulta } from "../models/Consulta";
import { toastErro, toastSucesso } from "../utils/toast";

export function useDetalheConsulta() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const queryClient = useQueryClient();

    // pega o id que foi passado ao navegar pra essa tela
    const { id_consulta } = route.params;

    // busca a consulta, e só depois dela chegar busca o animal e o responsável
    const consultaQuery = useQuery({
        queryKey: ["consulta", id_consulta],
        queryFn: () => consultaController.buscarPorId(id_consulta),
    });
    const consulta = consultaQuery.data ?? null;

    const animalQuery = useQuery({
        queryKey: ["animal", consulta?.id_animal],
        queryFn: () => pacienteController.buscarAnimalPorId(consulta!.id_animal),
        enabled: !!consulta,
    });
    const animal = animalQuery.data ?? null;

    const responsavelQuery = useQuery({
        queryKey: ["responsavel", animal?.id_responsavel],
        queryFn: () => pacienteController.buscarResponsavelPorId(animal!.id_responsavel),
        enabled: !!animal,
    });
    const responsavel = responsavelQuery.data ?? null;

    const carregando = consultaQuery.isLoading || animalQuery.isFetching || responsavelQuery.isFetching;

    // ---------- modal de edição ----------

    const [modalVisivel, setModalVisivel] = useState(false);
    const [historico, setHistorico] = useState("");
    const [dtConsulta, setDtConsulta] = useState("");
    const [hrConsulta, setHrConsulta] = useState("");
    const [status, setStatus] = useState<StatusConsulta>("Agendado");

    function abrirModalEditar() {
        if (!consulta) return;
        setHistorico(consulta.historico_consulta);
        setDtConsulta(consulta.dt_consulta);
        setHrConsulta(consulta.hr_consulta);
        setStatus(consulta.st_consulta);
        setModalVisivel(true);
    }

    function fecharModalEditar() {
        setModalVisivel(false);
    }

    const mutationAtualizar = useMutation({
        mutationFn: () =>
            consultaController.atualizar({
                ...consulta!,
                historico_consulta: historico,
                dt_consulta: dtConsulta,
                hr_consulta: hrConsulta,
                st_consulta: status,
            }),
        onSuccess: () => {
            toastSucesso("Consulta atualizada!");
            queryClient.invalidateQueries({ queryKey: ["consulta", id_consulta] });
            queryClient.invalidateQueries({ queryKey: ["consultas"] });
            setModalVisivel(false);
        },
        onError: () => toastErro("Não foi possível salvar as alterações."),
    });

    function handleSalvar() {
        if (!consulta) return;
        if (!historico || !dtConsulta || !hrConsulta) {
            toastErro("Preencha todos os campos obrigatórios.");
            return;
        }
        mutationAtualizar.mutate();
    }

    // ---------- remover ----------

    const mutationRemover = useMutation({
        mutationFn: () => consultaController.remover(id_consulta),
        onSuccess: () => {
            toastSucesso("Consulta removida.");
            queryClient.invalidateQueries({ queryKey: ["consultas"] });
            navigation.goBack();
        },
        onError: () => toastErro("Não foi possível remover a consulta."),
    });

    return {
        consulta,
        animal,
        responsavel,
        carregando,

        modalVisivel,
        abrirModalEditar,
        fecharModalEditar,
        historico, setHistorico,
        dtConsulta, setDtConsulta,
        hrConsulta, setHrConsulta,
        status, setStatus,
        handleSalvar,
        salvando: mutationAtualizar.isPending,

        remover: mutationRemover.mutate,
        removendo: mutationRemover.isPending,
    };
}
