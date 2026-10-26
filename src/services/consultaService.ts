import api from "./api";
import { AbaConsulta, Consulta, ConsultaResumo, NovaConsulta, RespostaConsultaSalva } from "../models/Consulta";

// chamadas do backend ligadas a consultas
export const consultaService = {
    // lista de uma aba (agendadas, atrasadas ou concluidas), a busca é pelo nome do animal
    async listarPorAba(aba: AbaConsulta, busca: string): Promise<ConsultaResumo[]> {
        const resposta = await api.get(`/consultas/${aba}`, { params: busca ? { busca } : undefined });
        return resposta.data;
    },

    // próximas consultas pro carrossel da Home
    async listarProximas(): Promise<ConsultaResumo[]> {
        const resposta = await api.get("/consultas/proximas");
        return resposta.data;
    },

    // cria a consulta; o backend resolve paciente e responsável numa tacada só
    async criar(dados: NovaConsulta): Promise<RespostaConsultaSalva> {
        const resposta = await api.post("/consultas", dados);
        return resposta.data;
    },

    // (temporário) daqui pra baixo é o jeito antigo, vai sendo trocado nas próximas features
    async listar(): Promise<Consulta[]> {
        const resposta = await api.get("/consultas");
        return resposta.data;
    },

    async buscarPorId(id: number): Promise<Consulta | null> {
        try {
            const resposta = await api.get(`/consultas/${id}`);
            return resposta.data;
        } catch {
            return null;
        }
    },

    async atualizar(consulta: Consulta): Promise<void> {
        await api.put(`/consultas/${consulta.id_consulta}`, {
            historico_consulta: consulta.historico_consulta,
            dt_consulta: consulta.dt_consulta,
            hr_consulta: consulta.hr_consulta,
            st_consulta: consulta.st_consulta,
        });
    },

    async remover(id: number): Promise<void> {
        await api.delete(`/consultas/${id}`);
    },
};
