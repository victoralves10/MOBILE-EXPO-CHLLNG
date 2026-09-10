import api from "./api";
import { Consulta } from "../models/Consulta";

export const consultaService = {

    // GET /consultas — todas as consultas do usuário logado
    async listar(): Promise<Consulta[]> {
        const resposta = await api.get("/consultas");
        return resposta.data;
    },
};