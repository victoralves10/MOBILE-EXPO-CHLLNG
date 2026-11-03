import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Cores, paletaClara, paletaEscura } from "./paletas";

export type PreferenciaTema = "automatico" | "claro" | "escuro";

const CHAVE = "@clyvovet:tema";

interface TemaContextData {
    cores: Cores;
    escuro: boolean;
    preferencia: PreferenciaTema;
    mudarPreferencia: (preferencia: PreferenciaTema) => void;
}

const TemaContext = createContext<TemaContextData | undefined>(undefined);

// tema do app
export function TemaProvider({ children }: { children: ReactNode }) {
    const temaDoCelular = useColorScheme();
    const [preferencia, setPreferencia] = useState<PreferenciaTema>("automatico");

    // lê a escolha salva
    useEffect(() => {
        AsyncStorage.getItem(CHAVE)
            .then((salva) => {
                if (salva === "claro" || salva === "escuro" || salva === "automatico") setPreferencia(salva);
            })
            .catch(() => {});
    }, []);

    // troca o tema
    function mudarPreferencia(nova: PreferenciaTema) {
        setPreferencia(nova);
        AsyncStorage.setItem(CHAVE, nova).catch(() => {});
    }

    // tema atual
    const escuro = preferencia === "automatico" ? temaDoCelular === "dark" : preferencia === "escuro";

    const valor = useMemo(
        () => ({ cores: escuro ? paletaEscura : paletaClara, escuro, preferencia, mudarPreferencia }),
        [escuro, preferencia]
    );

    return <TemaContext.Provider value={valor}>{children}</TemaContext.Provider>;
}

// cores do tema
export function useTema(): TemaContextData {
    const contexto = useContext(TemaContext);
    if (!contexto) throw new Error("useTema precisa ser usado dentro de um <TemaProvider>.");
    return contexto;
}
