import api from "./api";
import { Regiao } from "../models/Paciente";

// listas dos seletores
export const catalogoService = {
    async doencas(): Promise<string[]> {
        const resposta = await api.get("/catalogos/doencas");
        return resposta.data;
    },

    async regioes(): Promise<Regiao[]> {
        const resposta = await api.get("/catalogos/regioes");
        return resposta.data;
    },
};
