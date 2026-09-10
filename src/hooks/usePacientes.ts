import { useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { animalService } from "../services/animalService";
import { responsavelService } from "../services/responsavelService";
import { Animal } from "../models/Animal";
import { Responsavel } from "../models/Responsavel";

// tipagem que junta o animal com o responsável dele
interface PacienteComDados {
    animal: Animal;
    responsavel: Responsavel;
}

export function usePacientes() {
    const navigation = useNavigation<any>();

    const [busca, setBusca] = useState("");

    const animaisQuery = useQuery({
        queryKey: ["animais"],
        queryFn: () => animalService.listar(),
    });

    const responsaveisQuery = useQuery({
        queryKey: ["responsaveis"],
        queryFn: () => responsavelService.listar(),
    });

    // toda vez que o usuário voltar pra essa tela, busca os dados mais recentes
    useFocusEffect(
        useCallback(() => {
            animaisQuery.refetch();
            responsaveisQuery.refetch();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    );

    const carregando = animaisQuery.isLoading || responsaveisQuery.isLoading;
    const animais = animaisQuery.data ?? [];
    const responsaveis = responsaveisQuery.data ?? [];

    // combina cada animal com o responsável dele
    const pacientes: PacienteComDados[] = animais
        .map((animal) => {
            const responsavel = responsaveis.find((r) => r.id_responsavel === animal.id_responsavel);
            return responsavel ? { animal, responsavel } : null;
        })
        .filter((item): item is PacienteComDados => item !== null);

    // filtra por nome do animal ou nome do responsável
    const pacientesFiltrados = pacientes.filter(({ animal, responsavel }) =>
        animal.nm_animal.toLowerCase().includes(busca.toLowerCase()) ||
        responsavel.nm_responsavel.toLowerCase().includes(busca.toLowerCase())
    );

    function abrirDetalhePaciente(id_animal: number) {
        navigation.navigate("DetalhePaciente", { id_animal });
    }

    return {
        busca,
        setBusca,
        carregando,
        pacientesFiltrados,
        abrirDetalhePaciente,
    };
}

export type { PacienteComDados };