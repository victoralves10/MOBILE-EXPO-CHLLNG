import api from "./api";
import { Responsavel } from "../models/Responsavel";

export const responsavelService = {

    async listar(): Promise<Responsavel[]> {
        const resposta = await api.get("/responsaveis");
        return resposta.data;
    },

    async buscarPorId(id: number): Promise<Responsavel | null> {
        try {
            const resposta = await api.get(`/responsaveis/${id}`);
            return resposta.data;
        } catch (error) {
            console.error("[responsavelService.buscarPorId]", error);
            return null;
        }
    },

    async buscarPorCpf(cpf: string): Promise<Responsavel | null> {
        const resposta = await api.get("/responsaveis", { params: { cpf } });
        return resposta.data ?? null;
    },

    async criar(dados: Omit<Responsavel, "id_responsavel">): Promise<Responsavel> {
        const resposta = await api.post("/responsaveis", dados);
        return resposta.data;
    },

    async atualizar(responsavel: Responsavel): Promise<void> {
        await api.put(`/responsaveis/${responsavel.id_responsavel}`, {
            cpf_responsavel: responsavel.cpf_responsavel,
            nm_responsavel: responsavel.nm_responsavel,
            nr_telefone_responsavel: responsavel.nr_telefone_responsavel,
        });
    },

    async remover(id: number): Promise<void> {
        await api.delete(`/responsaveis/${id}`);
    },
};
