import api from "./api";
import { Responsavel } from "../models/Responsavel";

export const responsavelService = {

    // GET /responsaveis / todos os responsaveis do usuario logado
    async listar(): Promise<Responsavel[]> {
        const resposta = await api.get("/responsaveis");
        return resposta.data;
    },

    // GET /responsaveis/:id / um responsavel especifico
    async buscarPorId(id: number): Promise<Responsavel | null> {
        try {
            const resposta = await api.get(`/responsaveis/${id}`);
            return resposta.data;
        } catch {
            return null;
        }
    },

    // GET /responsaveis?cpf=XXX / usado na deduplicacoo ao criar consulta
    async buscarPorCpf(cpf: string): Promise<Responsavel | null> {
        const resposta = await api.get("/responsaveis", { params: { cpf } });
        return resposta.data ?? null;
    },

    // POST /responsaveis
    async criar(dados: Omit<Responsavel, "id_responsavel">): Promise<Responsavel> {
        const resposta = await api.post("/responsaveis", dados);
        return resposta.data;
    },

    // PUT /responsaveis/:id
    async atualizar(responsavel: Responsavel): Promise<void> {
        await api.put(`/responsaveis/${responsavel.id_responsavel}`, {
            cpf_responsavel: responsavel.cpf_responsavel,
            nm_responsavel: responsavel.nm_responsavel,
            nr_telefone_responsavel: responsavel.nr_telefone_responsavel,
        });
    },

    // DELETE /responsaveis/:id
    async remover(id: number): Promise<void> {
        await api.delete(`/responsaveis/${id}`);
    },
};
