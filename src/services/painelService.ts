import api from "./api";
import { Aviso, Dashboard, Mapa } from "../models/Painel";

// chamadas do backend ligadas aos números do consultório
export const painelService = {
    // indicadores do Perfil, já calculados e com os textos prontos
    async dashboard(): Promise<Dashboard> {
        const resposta = await api.get("/dashboard");
        return resposta.data;
    },

    // mapa da Home: regiões com consultas, atrasadas e doenças (cor e textos vêm prontos)
    async mapa(): Promise<Mapa> {
        const resposta = await api.get("/mapa/ocorrencias");
        return resposta.data;
    },

    // avisos esperando o celular (o backend já limpa a fila quando entrega)
    async buscarAvisos(): Promise<Aviso[]> {
        const resposta = await api.get("/avisos");
        return resposta.data;
    },
};
