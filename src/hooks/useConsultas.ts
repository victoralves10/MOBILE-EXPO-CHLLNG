import { useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { consultaService } from "../services/consultaService";
import { mensagemDeErro } from "../services/api";
import { useDebounce } from "./useDebounce";
import { AbaConsulta } from "../models/Consulta";

// lógica da lista de consultas: aba escolhida + busca, o resto o backend resolve
export function useConsultas() {
    const navigation = useNavigation<any>();

    const [aba, setAba] = useState<AbaConsulta>("agendadas");
    const [busca, setBusca] = useState("");

    // só manda a busca pro backend quando o usuário para de digitar
    const buscaDebounced = useDebounce(busca.trim(), 500);

    // cada aba chama o seu endpoint (/consultas/agendadas, /atrasadas, /concluidas)
    // keepPreviousData deixa a lista antiga na tela enquanto a nova carrega, sem piscar
    const consultasQuery = useQuery({
        queryKey: ["consultas", aba, buscaDebounced],
        queryFn: () => consultaService.listarPorAba(aba, buscaDebounced),
        placeholderData: keepPreviousData,
    });

    // toda vez que volta pra essa tela, recarrega (uma consulta pode ter virado atrasada)
    useFocusEffect(
        useCallback(() => {
            consultasQuery.refetch();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    );

    function abrirDetalheConsulta(id_consulta: number) {
        navigation.navigate("DetalheConsulta", { id_consulta });
    }

    return {
        aba,
        setAba,
        busca,
        setBusca,
        consultas: consultasQuery.data ?? [],
        carregando: consultasQuery.isLoading,
        erro: consultasQuery.isError ? mensagemDeErro(consultasQuery.error) : null,
        abrirDetalheConsulta,
    };
}