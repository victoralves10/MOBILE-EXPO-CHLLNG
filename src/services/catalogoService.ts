import api from "./api";
import { Regiao } from "../models/Paciente";

// listas fixas que o backend fornece pros seletores (por enquanto só as regiões)
export const catalogoService = {
    async regioes(): Promise<Regiao[]> {
        const resposta = await api.get("/catalogos/regioes");
        return resposta.data;
    },
};