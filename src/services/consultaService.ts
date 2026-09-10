import api from "./api";
import { Consulta } from "../models/Consulta";

export const consultaService = {

    // GET /consultas / todas as consultas do usuario logado
    async listar(): Promise<Consulta[]> {
        const resposta = await api.get("/consultas");
        return resposta.data;
    },

    // GET /consultas/:id / uma consulta especifica
    async buscarPorId(id: number): Promise<Consulta | null> {
        try {
            const resposta = await api.get(`/consultas/${id}`);
            return resposta.data;
        } catch {
            return null;
        }
    },

    // POST /consultas
    async criar(dados: Omit<Consulta, "id_consulta">): Promise<Consulta> {
        const resposta = await api.post("/consultas", dados);
        return resposta.data;
    },

    // PUT /consultas/:id
    async atualizar(consulta: Consulta): Promise<void> {
        await api.put(`/consultas/${consulta.id_consulta}`, {
            historico_consulta: consulta.historico_consulta,
            dt_consulta: consulta.dt_consulta,
            hr_consulta: consulta.hr_consulta,
            st_consulta: consulta.st_consulta,
        });
    },

    // DELETE /consultas/:id
    async remover(id: number): Promise<void> {
        await api.delete(`/consultas/${id}`);
    },
};
