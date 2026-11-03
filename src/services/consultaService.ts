import api from "./api";
import {
    AbaConsulta,
    ConsultaDetalhe,
    ConsultaResumo,
    DadosConsulta,
    Lembrete,
    NovaConsulta,
    RespostaConsultaSalva,
} from "../models/Consulta";

// consultas
export const consultaService = {
    async listarPorAba(aba: AbaConsulta, busca: string): Promise<ConsultaResumo[]> {
        const resposta = await api.get(`/consultas/${aba}`, { params: busca ? { busca } : undefined });
        return resposta.data;
    },

    async listarProximas(): Promise<ConsultaResumo[]> {
        const resposta = await api.get("/consultas/proximas");
        return resposta.data;
    },

    async listarLembretes(): Promise<Lembrete[]> {
        const resposta = await api.get("/consultas/lembretes");
        return resposta.data;
    },

    async buscarDetalhe(id: number): Promise<ConsultaDetalhe> {
        const resposta = await api.get(`/consultas/${id}`);
        return resposta.data;
    },

    async criar(dados: NovaConsulta): Promise<RespostaConsultaSalva> {
        const resposta = await api.post("/consultas", dados);
        return resposta.data;
    },

    async atualizar(id: number, dados: DadosConsulta): Promise<RespostaConsultaSalva> {
        const resposta = await api.put(`/consultas/${id}`, dados);
        return resposta.data;
    },

    async remover(id: number): Promise<{ mensagem: string }> {
        const resposta = await api.delete(`/consultas/${id}`);
        return resposta.data;
    },
};
