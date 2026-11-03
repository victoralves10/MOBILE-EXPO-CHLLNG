import { useState, useCallback, useEffect } from "react";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { consultaService } from "../services/consultaService";
import { mensagemDeErro } from "../services/api";
import { useDebounce } from "./useDebounce";
import { AbaConsulta } from "../models/Consulta";

// lógica da lista de consultas
export function useConsultas() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();

    const [aba, setAba] = useState<AbaConsulta>("agendadas");
    const [busca, setBusca] = useState("");
    const [modalAberto, setModalAberto] = useState(false);

    // pedidos vindos de outras telas
    const abaPedida: AbaConsulta | undefined = route.params?.aba;
    const novaConsultaPedida: boolean = route.params?.novaConsulta === true;

    useEffect(() => {
        if (abaPedida) {
            setAba(abaPedida);
            navigation.setParams({ aba: undefined });
        }
        if (novaConsultaPedida) {
            setModalAberto(true);
            navigation.setParams({ novaConsulta: undefined });
        }
    }, [abaPedida, novaConsultaPedida, navigation]);

    const buscaDebounced = useDebounce(busca.trim());

    const consultasQuery = useQuery({
        queryKey: ["consultas", aba, buscaDebounced],
        queryFn: () => consultaService.listarPorAba(aba, buscaDebounced),
        placeholderData: keepPreviousData,
    });

    // recarrega ao voltar pra tela
    useFocusEffect(
        useCallback(() => {
            consultasQuery.refetch();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    );

    return {
        aba,
        setAba,
        busca,
        setBusca,
        consultas: consultasQuery.data ?? [],
        carregando: consultasQuery.isLoading,
        erro: consultasQuery.isError ? mensagemDeErro(consultasQuery.error) : null,
        abrirDetalheConsulta: (id_consulta: number) => navigation.navigate("DetalheConsulta", { id_consulta }),
        modalAberto,
        abrirModal: () => setModalAberto(true),
        fecharModal: () => setModalAberto(false),
    };
}
