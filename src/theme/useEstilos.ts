import { useMemo } from "react";
import { useTema } from "./TemaContext";
import { Cores } from "./paletas";

// estilos com as cores do tema
export function useEstilos<T>(criarEstilos: (c: Cores) => T): T {
    const { cores } = useTema();
    return useMemo(() => criarEstilos(cores), [cores, criarEstilos]);
}
