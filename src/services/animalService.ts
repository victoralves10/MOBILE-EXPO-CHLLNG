import api from "./api";
import { AnimalApi } from "../global/types";

export const animalService = {

    // GET /animais — todos os animais (pacientes) do usuário logado
    async listar(): Promise<AnimalApi[]> {
        const resposta = await api.get("/animais");
        return resposta.data;
    },
};