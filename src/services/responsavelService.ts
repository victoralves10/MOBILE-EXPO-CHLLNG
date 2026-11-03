import api from "./api";
import { ResponsavelItem } from "../models/Paciente";

// responsáveis
export const responsavelService = {
    async buscar(busca: string): Promise<ResponsavelItem[]> {
        const resposta = await api.get("/responsaveis", { params: busca ? { busca } : undefined });
        return resposta.data;
    },
};
