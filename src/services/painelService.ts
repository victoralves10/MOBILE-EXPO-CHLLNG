import api from "./api";
import { Aviso, Dashboard, ResumoRegioes } from "../models/Painel";

// números do consultório, regiões e avisos
export const painelService = {
    async dashboard(): Promise<Dashboard> {
        const resposta = await api.get("/dashboard");
        return resposta.data;
    },

    async regioes(): Promise<ResumoRegioes> {
        const resposta = await api.get("/regioes/resumo");
        return resposta.data;
    },

    async buscarAvisos(): Promise<Aviso[]> {
        const resposta = await api.get("/avisos");
        return resposta.data;
    },
};
