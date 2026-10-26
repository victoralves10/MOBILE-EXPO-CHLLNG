import api from "./api";
import { DadosPaciente, Ficha, PacienteItem } from "../models/Paciente";

// chamadas do backend ligadas a pacientes
export const pacienteService = {
    // busca pelo nome do animal ou do responsável (vazio = todos)
    async buscar(busca: string): Promise<PacienteItem[]> {
        const resposta = await api.get("/pacientes", { params: busca ? { busca } : undefined });
        return resposta.data;
    },

    // ficha completa: animal + responsável + histórico, numa requisição só
    async buscarFicha(id: number): Promise<Ficha> {
        const resposta = await api.get(`/pacientes/${id}`);
        return resposta.data;
    },

    // edita animal e responsável juntos (o backend salva os dois de uma vez)
    async atualizar(id: number, dados: DadosPaciente): Promise<{ mensagem: string; paciente: Ficha }> {
        const resposta = await api.put(`/pacientes/${id}`, dados);
        return resposta.data;
    },

    // remove o paciente e as consultas dele; o responsável continua cadastrado
    async remover(id: number): Promise<{ mensagem: string; consultas_removidas: number[] }> {
        const resposta = await api.delete(`/pacientes/${id}`);
        return resposta.data;
    },
};