import api from "./api";
import { ConsultaApi } from "../global/types";

export const consultaService = {

    // GET /consultas — todas as consultas do usuário logado
    async listar(): Promise<ConsultaApi[]> {
        const resposta = await api.get("/consultas");
        return resposta.data;
    },
};