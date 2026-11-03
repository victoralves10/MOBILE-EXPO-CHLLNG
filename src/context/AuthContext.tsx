import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";
import { authService } from "../services/authService";
import { registrarAoSessaoExpirar } from "../services/api";
import { queryClient } from "../services/queryClient";
import { cancelarTodos } from "../services/notificacoes";
import * as tokenStorage from "../storage/tokenStorage";
import { RespostaSessao } from "../models/User";
import { toastAviso } from "../utils/toast";
import { log } from "../utils/log";

interface AuthContextData {
    logado: boolean;
    carregando: boolean;
    iniciarSessao: (sessao: RespostaSessao) => Promise<void>;
    encerrarSessao: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

// limpa a sessão do celular
async function limparSessaoLocal() {
    await tokenStorage.removerToken();
    queryClient.clear();
    await cancelarTodos();
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [logado, setLogado] = useState(false);
    const [carregando, setCarregando] = useState(true);

    // confere a sessão salva ao abrir o app
    useEffect(() => {
        async function conferirSessaoSalva() {
            const token = await tokenStorage.buscarToken();
            if (!token) {
                log.sessao("nenhuma sessão salva");
                return setCarregando(false);
            }
            try {
                const usuario = await authService.perfil();
                queryClient.setQueryData(["usuario"], usuario);
                log.sessao(`sessão restaurada (${usuario.email_usuario})`);
                setLogado(true);
            } catch (erro) {
                // sem internet continua logado
                if (axios.isAxiosError(erro) && !erro.response) setLogado(true);
            } finally {
                setCarregando(false);
            }
        }
        conferirSessaoSalva();
    }, []);

    // token recusado pelo backend
    useEffect(() => {
        registrarAoSessaoExpirar(async () => {
            log.sessao("token recusado, saindo");
            await limparSessaoLocal();
            setLogado(false);
            toastAviso("Sua sessão expirou. Faça login novamente.");
        });
    }, []);

    // entra no app depois do login ou cadastro
    async function iniciarSessao({ token, usuario }: RespostaSessao) {
        await tokenStorage.salvarToken(token);
        queryClient.clear();
        queryClient.setQueryData(["usuario"], usuario);
        log.sessao(`login feito (${usuario.email_usuario})`);
        setLogado(true);
    }

    // sai do app
    async function encerrarSessao() {
        authService.sair().catch(() => {});
        await limparSessaoLocal();
        log.sessao("logout feito");
        setLogado(false);
    }

    return (
        <AuthContext.Provider value={{ logado, carregando, iniciarSessao, encerrarSessao }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextData {
    const contexto = useContext(AuthContext);
    if (!contexto) throw new Error("useAuth precisa estar dentro do AuthProvider.");
    return contexto;
}
