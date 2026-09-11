import api from "./api";
import { Animal } from "../models/Animal";
import { Consulta } from "../models/Consulta";

export const animalService = {

    async listar(): Promise<Animal[]> {
        const resposta = await api.get("/animais");
        return resposta.data;
    },

    async buscarPorId(id: number): Promise<Animal | null> {
        try {
            const resposta = await api.get(`/animais/${id}`);
            return resposta.data;
        } catch (error) {
            console.error("[animalService.buscarPorId]", error);
            return null;
        }
    },

    async buscarPorMicrochip(microchip: string): Promise<Animal | null> {
        const resposta = await api.get("/animais", { params: { microchip } });
        return resposta.data ?? null;
    },

    async listarConsultas(id: number): Promise<Consulta[]> {
        const resposta = await api.get(`/animais/${id}/consultas`);
        return resposta.data;
    },

    async criar(dados: Omit<Animal, "id_animal">): Promise<Animal> {
        const resposta = await api.post("/animais", dados);
        return resposta.data;
    },

    async atualizar(animal: Animal): Promise<void> {
        await api.put(`/animais/${animal.id_animal}`, {
            nm_animal: animal.nm_animal,
            especie_animal: animal.especie_animal,
            raca_animal: animal.raca_animal,
            dt_nascimento_animal: animal.dt_nascimento_animal,
            peso_animal: animal.peso_animal,
            rg_animal: animal.rg_animal,
            nr_microchip_animal: animal.nr_microchip_animal,
        });
    },

    async remover(id: number): Promise<void> {
        await api.delete(`/animais/${id}`);
    },
};
