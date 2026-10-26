import api from "./api";
import { PacienteItem } from "../models/Paciente";

// chamadas do backend ligadas a pacientes
export const pacienteService = {
    // busca pelo nome do animal ou do responsável
    async buscar(busca: string): Promise<PacienteItem[]> {
        const resposta = await api.get("/pacientes", { params: busca ? { busca } : undefined });
        return resposta.data;
    },
};
