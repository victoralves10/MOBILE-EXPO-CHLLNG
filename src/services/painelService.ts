import api from "./api";
import { Aviso, Dashboard, Mapa } from "../models/Painel";

// números do consultório, mapa e avisos
export const painelService = {
    async dashboard(): Promise<Dashboard> {
        const resposta = await api.get("/dashboard");
        return resposta.data;
    },

    async mapa(): Promise<Mapa> {
        const resposta = await api.get("/mapa/ocorrencias");
        return resposta.data;
    },

    async buscarAvisos(): Promise<Aviso[]> {
        const resposta = await api.get("/avisos");
        return resposta.data;
    },
};
