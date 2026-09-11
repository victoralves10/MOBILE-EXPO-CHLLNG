import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { authController } from "../controllers/authController";

interface AuthContextData {
    logado: boolean;
    carregando: boolean;
    entrar: () => void;
    sair: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [logado, setLogado] = useState(false);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function verificarSessaoSalva() {
            try {
                const sessaoAtiva = await authController.verificarSessao();
                setLogado(sessaoAtiva);
            } catch (error) {
                console.error("[AuthContext.verificarSessaoSalva]", error);
                setLogado(false);
            } finally {
                setCarregando(false);
            }
        }
        verificarSessaoSalva();
    }, []);

    function entrar() {
        setLogado(true);
    }

    function sair() {
        authController.fazerLogout().catch((error) => {
            console.error("[AuthContext.sair]", error);
        });
        setLogado(false);
    }

    return (
        <AuthContext.Provider value={{ logado, carregando, entrar, sair }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextData {
    const contexto = useContext(AuthContext);
    if (!contexto) {
        throw new Error("useAuth precisa ser usado dentro de um <AuthProvider>.");
    }
    return contexto;
}
