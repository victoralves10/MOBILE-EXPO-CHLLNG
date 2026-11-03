import api from "./api";
import { DadosPaciente, Ficha, PacienteItem } from "../models/Paciente";

// pacientes
export const pacienteService = {
    async buscar(busca: string): Promise<PacienteItem[]> {
        const resposta = await api.get("/pacientes", { params: busca ? { busca } : undefined });
        return resposta.data;
    },

    async buscarFicha(id: number): Promise<Ficha> {
        const resposta = await api.get(`/pacientes/${id}`);
        return resposta.data;
    },

    async atualizar(id: number, dados: DadosPaciente): Promise<{ mensagem: string; paciente: Ficha }> {
        const resposta = await api.put(`/pacientes/${id}`, dados);
        return resposta.data;
    },

    async remover(id: number): Promise<{ mensagem: string; consultas_removidas: number[] }> {
        const resposta = await api.delete(`/pacientes/${id}`);
        return resposta.data;
    },
};
