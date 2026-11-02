import { useMemo } from "react";
import { useTema } from "./TemaContext";
import { Cores } from "./paletas";

// cada styles.ts exporta uma função que recebe as cores e devolve o StyleSheet
// esse hook chama a função com as cores do tema atual (e só refaz quando o tema muda)
export function useEstilos<T>(criarEstilos: (c: Cores) => T): T {
    const { cores } = useTema();
    return useMemo(() => criarEstilos(cores), [cores, criarEstilos]);
}
