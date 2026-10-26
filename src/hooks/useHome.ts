import { useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { consultaService } from "../services/consultaService";

// lógica da Home: as próximas consultas já vêm prontas e ordenadas do backend
export function useHome() {
    const navigation = useNavigation<any>();

    const proximasQuery = useQuery({
        queryKey: ["consultas", "proximas"],
        queryFn: () => consultaService.listarProximas(),
    });

    // recarrega sempre que volta pra Home
    useFocusEffect(
        useCallback(() => {
            proximasQuery.refetch();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    );

    function abrirDetalheConsulta(idConsulta: number) {
        navigation.navigate("DetalheConsulta", { id_consulta: idConsulta });
    }

    return {
        proximas: proximasQuery.data ?? [],
        carregando: proximasQuery.isLoading,
        abrirDetalheConsulta,
    };
}