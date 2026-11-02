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

// guarda qual tema está valendo e entrega as cores certas pro app inteiro
export function TemaProvider({ children }: { children: ReactNode }) {
    const temaDoCelular = useColorScheme(); // "light" ou "dark", segue o celular
    const [preferencia, setPreferencia] = useState<PreferenciaTema>("automatico");

    // quando abre o app, lê a escolha salva
    useEffect(() => {
        AsyncStorage.getItem(CHAVE)
            .then((salva) => {
                if (salva === "claro" || salva === "escuro" || salva === "automatico") setPreferencia(salva);
            })
            .catch(() => {});
    }, []);

    // troca e salva a escolha
    function mudarPreferencia(nova: PreferenciaTema) {
        setPreferencia(nova);
        AsyncStorage.setItem(CHAVE, nova).catch(() => {});
    }

    // automático segue o celular; claro e escuro forçam
    const escuro = preferencia === "automatico" ? temaDoCelular === "dark" : preferencia === "escuro";

    const valor = useMemo(
        () => ({ cores: escuro ? paletaEscura : paletaClara, escuro, preferencia, mudarPreferencia }),
        [escuro, preferencia]
    );

    return <TemaContext.Provider value={valor}>{children}</TemaContext.Provider>;
}

// atalho pras telas e componentes pegarem as cores
export function useTema(): TemaContextData {
    const contexto = useContext(TemaContext);
    if (!contexto) throw new Error("useTema precisa ser usado dentro de um <TemaProvider>.");
    return contexto;
}
