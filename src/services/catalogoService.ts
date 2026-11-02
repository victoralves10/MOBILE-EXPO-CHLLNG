import api from "./api";
import { Regiao } from "../models/Paciente";

// listas fixas que o backend fornece pros seletores
export const catalogoService = {
    // doenças aceitas no campo de diagnóstico da consulta
    async doencas(): Promise<string[]> {
        const resposta = await api.get("/catalogos/doencas");
        return resposta.data;
    },

    async regioes(): Promise<Regiao[]> {
        const resposta = await api.get("/catalogos/regioes");
        return resposta.data;
    },
};
