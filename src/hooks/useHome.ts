import { useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { consultaService } from "../services/consultaService";
import { authService } from "../services/authService";

// lógica da Home: as próximas consultas já vêm prontas e ordenadas do backend
export function useHome() {
    const navigation = useNavigation<any>();

    // usuário logado, pra saudação do topo
    const usuarioQuery = useQuery({
        queryKey: ["usuario"],
        queryFn: () => authService.perfil(),
    });

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

    // atalhos da Home
    const atalhos = {
        novaConsulta: () => navigation.navigate("Consultas", { novaConsulta: true }),
        atrasadas: () => navigation.navigate("Consultas", { aba: "atrasadas" }),
        pacientes: () => navigation.navigate("Pacientes"),
    };

    return {
        usuario: usuarioQuery.data ?? null,
        proximas: proximasQuery.data ?? [],
        carregando: proximasQuery.isLoading,
        abrirDetalheConsulta,
        atalhos,
    };
}
