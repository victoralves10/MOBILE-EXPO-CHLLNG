import api from "./api";
import { Dashboard } from "../models/Painel";

// chamadas do backend ligadas aos números do consultório
export const painelService = {
    // indicadores do Perfil, já calculados e com os textos prontos
    async dashboard(): Promise<Dashboard> {
        const resposta = await api.get("/dashboard");
        return resposta.data;
    },
};