import { useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { pacienteService } from "../services/pacienteService";
import { mensagemDeErro } from "../services/api";
import { useDebounce } from "./useDebounce";

// lógica da lista de pacientes
export function usePacientes() {
    const navigation = useNavigation<any>();
    const [busca, setBusca] = useState("");
    const buscaDebounced = useDebounce(busca.trim());

    const pacientesQuery = useQuery({
        queryKey: ["pacientes", buscaDebounced],
        queryFn: () => pacienteService.buscar(buscaDebounced),
        placeholderData: keepPreviousData,
    });

    // recarrega ao voltar pra tela
    useFocusEffect(
        useCallback(() => {
            pacientesQuery.refetch();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    );

    return {
        busca,
        setBusca,
        pacientes: pacientesQuery.data ?? [],
        carregando: pacientesQuery.isLoading,
        erro: pacientesQuery.isError ? mensagemDeErro(pacientesQuery.error) : null,
        abrirDetalhePaciente: (id_animal: number) => navigation.navigate("DetalhePaciente", { id_animal }),
    };
}
