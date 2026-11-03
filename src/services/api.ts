import axios from "axios";
import * as tokenStorage from "../storage/tokenStorage";
import { log } from "../utils/log";

// endereço do backend
const API_URL = "https://api-clyvo-node.onrender.com";

const api = axios.create({ baseURL: API_URL, timeout: 15000 });

// rotas sem sessão
const ROTAS_SEM_SESSAO = ["/auth/login", "/auth/cadastro"];

// sessão expirada
let aoSessaoExpirar: (() => void) | null = null;

export function registrarAoSessaoExpirar(callback: () => void) {
    aoSessaoExpirar = callback;
}

// envia o token
api.interceptors.request.use(async (config) => {
    const token = await tokenStorage.buscarToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    log.api(`→ ${config.method?.toUpperCase()} ${config.url}`);
    return config;
});

// trata a resposta
api.interceptors.response.use(
    (resposta) => {
        log.api(`← ${resposta.status} ${resposta.config.url}`);
        return resposta;
    },
    (erro) => {
        const status = erro.response?.status;
        const url = erro.config?.url ?? "";
        log.api(`✖ ${status ?? "sem resposta"} ${url} — ${mensagemDeErro(erro)}`);

        if (status === 401 && !ROTAS_SEM_SESSAO.includes(url)) aoSessaoExpirar?.();
        return Promise.reject(erro);
    }
);

// mensagem de erro do backend
export function mensagemDeErro(erro: unknown): string {
    if (axios.isAxiosError(erro)) {
        const mensagem = erro.response?.data?.error;
        if (mensagem) return mensagem;
        if (!erro.response) return "Sem conexão com o servidor.";
    }
    return "Algo deu errado. Tente de novo.";
}

export default api;