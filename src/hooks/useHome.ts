import { useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { consultaService } from "../services/consultaService";
import { authService } from "../services/authService";
import { painelService } from "../services/painelService";

// lógica da Home
export function useHome() {
    const navigation = useNavigation<any>();

    const usuarioQuery = useQuery({ queryKey: ["usuario"], queryFn: authService.perfil });
    const dashboardQuery = useQuery({ queryKey: ["consultas", "dashboard"], queryFn: painelService.dashboard });
    const proximasQuery = useQuery({ queryKey: ["consultas", "proximas"], queryFn: consultaService.listarProximas });
    const mapaQuery = useQuery({ queryKey: ["consultas", "mapa"], queryFn: painelService.mapa });

    // recarrega ao voltar pra Home
    useFocusEffect(
        useCallback(() => {
            dashboardQuery.refetch();
            proximasQuery.refetch();
            mapaQuery.refetch();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    );

    return {
        usuario: usuarioQuery.data ?? null,
        resumo: dashboardQuery.data?.resumo_home ?? "",
        proximas: proximasQuery.data ?? [],
        carregando: proximasQuery.isLoading,
        mapa: mapaQuery.data ?? null,
        carregandoMapa: mapaQuery.isLoading,
        abrirDetalheConsulta: (id_consulta: number) => navigation.navigate("DetalheConsulta", { id_consulta }),
        atalhos: {
            novaConsulta: () => navigation.navigate("Consultas", { novaConsulta: true }),
            atrasadas: () => navigation.navigate("Consultas", { aba: "atrasadas" }),
            pacientes: () => navigation.navigate("Pacientes"),
        },
    };
}
