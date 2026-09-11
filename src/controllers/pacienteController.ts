import { animalService } from "../services/animalService";
import { responsavelService } from "../services/responsavelService";
import { Responsavel } from "../models/Responsavel";
import { Animal } from "../models/Animal";
import { Consulta } from "../models/Consulta";

export const pacienteController = {

    async buscarTodosResponsaveis(): Promise<Responsavel[]> {
        return await responsavelService.listar();
    },

    async buscarTodosAnimais(): Promise<Animal[]> {
        return await animalService.listar();
    },

    async buscarResponsavelPorId(id: number): Promise<Responsavel | null> {
        return await responsavelService.buscarPorId(id);
    },

    async buscarAnimalPorId(id: number): Promise<Animal | null> {
        return await animalService.buscarPorId(id);
    },

    async buscarAnimaisPorResponsavel(id_responsavel: number): Promise<Animal[]> {
        const todos = await animalService.listar();
        return todos.filter(a => a.id_responsavel === id_responsavel);
    },

    async buscarConsultasDoAnimal(id_animal: number): Promise<Consulta[]> {
        return await animalService.listarConsultas(id_animal);
    },

    async buscarFichaCompleta(id_animal: number): Promise<{
        animal: Animal | null;
        responsavel: Responsavel | null;
        consultas: Consulta[];
    }> {
        try {
            const animal = await animalService.buscarPorId(id_animal);

            const [responsavel, consultas] = animal
                ? await Promise.all([
                      responsavelService.buscarPorId(animal.id_responsavel),
                      this.buscarConsultasDoAnimal(id_animal),
                  ])
                : [null, []];

            return { animal, responsavel, consultas };
        } catch (error) {
            console.error("[pacienteController.buscarFichaCompleta]", error);
            throw error;
        }
    },

    async atualizarAnimal(animal: Animal): Promise<void> {
        try {
            await animalService.atualizar(animal);
        } catch (error) {
            console.error("[pacienteController.atualizarAnimal]", error);
            throw error;
        }
    },

    async atualizarResponsavel(responsavel: Responsavel): Promise<void> {
        try {
            await responsavelService.atualizar(responsavel);
        } catch (error) {
            console.error("[pacienteController.atualizarResponsavel]", error);
            throw error;
        }
    },

    async removerPaciente(id_animal: number, id_responsavel: number): Promise<void> {
        try {
            await animalService.remover(id_animal);

            const outrosAnimais = await this.buscarAnimaisPorResponsavel(id_responsavel);
            if (outrosAnimais.length === 0) {
                await responsavelService.remover(id_responsavel);
            }
        } catch (error) {
            console.error("[pacienteController.removerPaciente]", error);
            throw error;
        }
    },
};
