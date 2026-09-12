import axios from "axios";
import * as tokenStorage from "../storage/tokenStorage";

const BASE_URL = "https://apirest-node-chllng.onrender.com";

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use(async (config) => {
    const token = await tokenStorage.buscarToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

let aoSessaoExpirar: (() => void) | null = null;

export function registrarAoSessaoExpirar(callback: () => void) {
    aoSessaoExpirar = callback;
}

api.interceptors.response.use(
    (resposta) => resposta,
    async (erro) => {
        const metodo = erro?.config?.method?.toUpperCase();
        const url = erro?.config?.url;
        const status = erro?.response?.status;
        const dados = erro?.response?.data;
        console.warn(`[api] Falha em ${metodo} ${url} — status: ${status ?? "sem resposta (rede/timeout)"}`, dados ?? erro.message);

        if (status === 401) {
            await tokenStorage.removerToken();
            aoSessaoExpirar?.();
        }

        return Promise.reject(erro);
    }
);

export default api;