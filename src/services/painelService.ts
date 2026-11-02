import api from "./api";
import { Aviso, Dashboard } from "../models/Painel";

// chamadas do backend ligadas aos números do consultório
export const painelService = {
    // indicadores do Perfil, já calculados e com os textos prontos
    async dashboard(): Promise<Dashboard> {
        const resposta = await api.get("/dashboard");
        return resposta.data;
    },

    // avisos esperando o celular (o backend já limpa a fila quando entrega)
    async buscarAvisos(): Promise<Aviso[]> {
        const resposta = await api.get("/avisos");
        return resposta.data;
    },
};
