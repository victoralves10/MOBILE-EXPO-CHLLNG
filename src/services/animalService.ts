import api from "./api";
import { Animal } from "../models/Animal";

export const animalService = {

    // GET /animais — todos os animais (pacientes) do usuário logado
    async listar(): Promise<Animal[]> {
        const resposta = await api.get("/animais");
        return resposta.data;
    },
};