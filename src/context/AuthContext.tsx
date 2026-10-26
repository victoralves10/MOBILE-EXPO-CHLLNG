import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";
import { authService } from "../services/authService";
import { registrarAoSessaoExpirar } from "../services/api";
import { queryClient } from "../services/queryClient";
import * as tokenStorage from "../storage/tokenStorage";
import { RespostaSessao } from "../models/User";
import { toastAviso } from "../utils/toast";
import { log } from "../utils/log";

// o que o contexto entrega pras telas: se tá logado e as duas funções de sessão
interface AuthContextData {
    logado: boolean;
    carregando: boolean;
    iniciarSessao: (sessao: RespostaSessao) => Promise<void>;
    encerrarSessao: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

// apaga o token e limpa o cache, pra não sobrar dado do usuário anterior
async function limparSessaoLocal() {
    await tokenStorage.removerToken();
    queryClient.clear();
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [logado, setLogado] = useState(false);
    const [carregando, setCarregando] = useState(true);

    // quando o app abre, vê se tem token salvo e pergunta pro backend se ele ainda vale
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
                // sem internet mantém logado, as telas mostram o erro de conexão
                // se foi 401, o interceptor do api.ts já deslogou
                if (axios.isAxiosError(erro) && !erro.response) setLogado(true);
            } finally {
                setCarregando(false);
            }
        }
        conferirSessaoSalva();
    }, []);

    // se o backend recusar o token (conta apagada, banco resetado...), desloga
    useEffect(() => {
        registrarAoSessaoExpirar(async () => {
            log.sessao("token recusado pelo backend, saindo");
            await limparSessaoLocal();
            setLogado(false);
            toastAviso("Sua sessão expirou. Faça login novamente.");
        });
    }, []);

    // chamado depois do login ou cadastro: salva o token e entra no app
    async function iniciarSessao({ token, usuario }: RespostaSessao) {
        await tokenStorage.salvarToken(token);
        queryClient.clear();
        queryClient.setQueryData(["usuario"], usuario);
        log.sessao(`login feito (${usuario.email_usuario})`);
        setLogado(true);
    }

    // chamado no logout ou quando a conta é apagada: limpa tudo e volta pro login
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

// atalho pras telas usarem o contexto
export function useAuth(): AuthContextData {
    const contexto = useContext(AuthContext);
    if (!contexto) {
        throw new Error("useAuth precisa ser usado dentro de um <AuthProvider>.");
    }
    return contexto;
}