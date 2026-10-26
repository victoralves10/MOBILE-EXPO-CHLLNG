import { useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { pacienteService } from "../services/pacienteService";
import { mensagemDeErro } from "../services/api";
import { useDebounce } from "./useDebounce";

// lógica da lista de pacientes: só a busca, quem filtra é o backend
export function usePacientes() {
    const navigation = useNavigation<any>();

    const [busca, setBusca] = useState("");

    // só manda a busca pro backend quando o usuário para de digitar
    const buscaDebounced = useDebounce(busca.trim(), 500);

    // busca pelo nome do animal ou do responsável (vazio traz todos)
    const pacientesQuery = useQuery({
        queryKey: ["pacientes", buscaDebounced],
        queryFn: () => pacienteService.buscar(buscaDebounced),
        placeholderData: keepPreviousData,
    });

    // recarrega sempre que volta pra essa tela
    useFocusEffect(
        useCallback(() => {
            pacientesQuery.refetch();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    );

    function abrirDetalhePaciente(id_animal: number) {
        navigation.navigate("DetalhePaciente", { id_animal });
    }

    return {
        busca,
        setBusca,
        pacientes: pacientesQuery.data ?? [],
        carregando: pacientesQuery.isLoading,
        erro: pacientesQuery.isError ? mensagemDeErro(pacientesQuery.error) : null,
        abrirDetalhePaciente,
    };
}