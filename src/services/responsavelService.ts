import api from "./api";
import { ResponsavelItem } from "../models/Paciente";

// chamadas do backend ligadas a responsáveis
export const responsavelService = {
    // busca por nome, CPF ou telefone (o backend devolve no máximo 20)
    async buscar(busca: string): Promise<ResponsavelItem[]> {
        const resposta = await api.get("/responsaveis", { params: busca ? { busca } : undefined });
        return resposta.data;
    },
};