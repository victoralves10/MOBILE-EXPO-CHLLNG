import { pacienteStorage } from "../storage/pacienteStorage";
import { consultaStorage } from "../storage/consultaStorage";
import { Responsavel } from "../models/Responsavel";
import { Animal } from "../models/Animal";
import { Consulta } from "../models/Consulta";

export const pacienteController = {

    // retorna todos os responsáveis salvos
    async buscarTodosResponsaveis(): Promise<Responsavel[]> {
        return await pacienteStorage.buscarTodosResponsaveis();
    },

    // retorna todos os animais salvos
    async buscarTodosAnimais(): Promise<Animal[]> {
        return await pacienteStorage.buscarTodosAnimais();
    },

    // busca um responsável específico pelo id
    async buscarResponsavelPorId(id: string): Promise<Responsavel | null> {
        return await pacienteStorage.buscarResponsavelPorId(id);
    },

    // busca um animal específico pelo id
    async buscarAnimalPorId(id: string): Promise<Animal | null> {
        return await pacienteStorage.buscarAnimalPorId(id);
    },

    // retorna todos os animais vinculados a um responsável
    async buscarAnimaisPorResponsavel(id_responsavel: string): Promise<Animal[]> {
        return await pacienteStorage.buscarAnimaisPorResponsavel(id_responsavel);
    },

    // retorna todas as consultas de um animal específico
    async buscarConsultasDoAnimal(id_animal: string): Promise<Consulta[]> {
        const todas = await consultaStorage.buscarTodas();
        return todas.filter(c => c.id_animal === id_animal);
    },

    // retorna a ficha completa: animal + responsável + histórico de consultas
    async buscarFichaCompleta(id_animal: string): Promise<{
        animal: Animal | null;
        responsavel: Responsavel | null;
        consultas: Consulta[];
    }> {
        const animal = await pacienteStorage.buscarAnimalPorId(id_animal);

        // só busca o responsável se encontrou o animal
        const responsavel = animal
            ? await pacienteStorage.buscarResponsavelPorId(animal.id_responsavel)
            : null;

        const consultas = await this.buscarConsultasDoAnimal(id_animal);
        return { animal, responsavel, consultas };
    },

    // atualiza os dados de um animal existente
    async atualizarAnimal(animal: Animal): Promise<void> {
        await pacienteStorage.atualizarAnimal(animal);
    },

    // atualiza os dados de um responsável existente
    async atualizarResponsavel(responsavel: Responsavel): Promise<void> {
        await pacienteStorage.atualizarResponsavel(responsavel);
    },

    async removerPaciente(id_animal: string, id_responsavel: string): Promise<void> {

        // remove o animal
        await pacienteStorage.removerAnimal(id_animal);

        // verifica se o responsável ainda tem outros animais vinculados
        // se não tiver, remove o responsável também
        const outrosAnimais = await pacienteStorage.buscarAnimaisPorResponsavel(id_responsavel);
        if (outrosAnimais.length === 0) {
            await pacienteStorage.removerResponsavel(id_responsavel);
        }

        // remove todas as consultas vinculadas a esse animal
        const todasConsultas = await consultaStorage.buscarTodas();
        const consultasFiltradas = todasConsultas.filter(c => c.id_animal !== id_animal);
        await consultaStorage.salvarTodas(consultasFiltradas);
    },
};