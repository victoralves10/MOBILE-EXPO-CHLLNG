import axios, { AxiosError } from "axios";
import * as tokenStorage from "../storage/tokenStorage";
import { log } from "../utils/log";

// endereço do backend, é o IP que aparece no terminal do backend
const API_URL = "http://192.168.1.2:3000";

// adiciona um campo na config do axios pra guardar quando a requisição começou
declare module "axios" {
    interface InternalAxiosRequestConfig {
        inicio?: number;
    }
}

// cliente do axios apontando pro backend
const api = axios.create({ baseURL: API_URL, timeout: 15000 });

log.api(`backend: ${API_URL}`);

// nessas rotas o 401 é só senha errada, não é sessão expirada
const ROTAS_SEM_SESSAO = ["/auth/login", "/auth/cadastro"];

// monta o texto "GET /rota?busca=x" pra aparecer no log
function descrever(metodo?: string, url?: string, params?: Record<string, unknown>) {
    const query = params ? new URLSearchParams(params as Record<string, string>).toString() : "";
    return `${metodo?.toUpperCase()} ${url}${query ? `?${query}` : ""}`;
}

// antes de cada requisição: coloca o token e loga que ela saiu
api.interceptors.request.use(async (config) => {
    const token = await tokenStorage.buscarToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    config.inicio = Date.now();
    log.api(`→ ${descrever(config.method, config.url, config.params)}`);
    return config;
});

// o AuthContext registra aqui o que fazer quando o token for recusado
let aoSessaoExpirar: (() => void) | null = null;

export function registrarAoSessaoExpirar(callback: () => void) {
    aoSessaoExpirar = callback;
}

// depois de cada resposta: loga se deu certo ou errado e quanto tempo levou
api.interceptors.response.use(
    (resposta) => {
        const { config } = resposta;
        const ms = Date.now() - (config.inicio ?? Date.now());
        log.api(`← ${resposta.status} ${descrever(config.method, config.url, config.params)} (${ms} ms)`);
        return resposta;
    },
    async (erro: AxiosError) => {
        const config = erro.config;
        const ms = Date.now() - (config?.inicio ?? Date.now());
        const status = erro.response?.status;
        log.api(
            `✖ ${status ?? "sem resposta"} ${descrever(config?.method, config?.url, config?.params)} (${ms} ms) — ${mensagemDeErro(erro)}`
        );

        // token recusado fora do login/cadastro = desloga o usuário
        if (status === 401 && !ROTAS_SEM_SESSAO.includes(config?.url ?? "")) {
            aoSessaoExpirar?.();
        }

        return Promise.reject(erro);
    }
);

// pega a mensagem de erro que o backend mandou ({ error: "..." }) pra mostrar no toast
// se não veio resposta nenhuma, é porque o backend tá fora do ar ou fora da rede
export function mensagemDeErro(erro: unknown): string {
    if (axios.isAxiosError(erro)) {
        const mensagem = (erro.response?.data as { error?: string } | undefined)?.error;
        if (mensagem) return mensagem;
        if (!erro.response) return "Sem conexão com o servidor.";
    }
    return "Algo deu errado. Tente de novo.";
}

export default api;