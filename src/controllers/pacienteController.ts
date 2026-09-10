import { animalService } from "../services/animalService";
import { responsavelService } from "../services/responsavelService";
import { Responsavel } from "../models/Responsavel";
import { Animal } from "../models/Animal";
import { Consulta } from "../models/Consulta";

export const pacienteController = {

    // retorna todos os responsáveis do usuário logado
    async buscarTodosResponsaveis(): Promise<Responsavel[]> {
        return await responsavelService.listar();
    },

    // retorna todos os animais do usuário logado
    async buscarTodosAnimais(): Promise<Animal[]> {
        return await animalService.listar();
    },

    // busca um responsável específico pelo id
    async buscarResponsavelPorId(id: number): Promise<Responsavel | null> {
        return await responsavelService.buscarPorId(id);
    },

    // busca um animal específico pelo id
    async buscarAnimalPorId(id: number): Promise<Animal | null> {
        return await animalService.buscarPorId(id);
    },

    // retorna todos os animais vinculados a um responsável (a API não tem
    // esse filtro pronto, então busca todos e filtra aqui, igual a Home faz)
    async buscarAnimaisPorResponsavel(id_responsavel: number): Promise<Animal[]> {
        const todos = await animalService.listar();
        return todos.filter(a => a.id_responsavel === id_responsavel);
    },

    // retorna todas as consultas de um animal específico
    async buscarConsultasDoAnimal(id_animal: number): Promise<Consulta[]> {
        return await animalService.listarConsultas(id_animal);
    },

    // retorna a ficha completa: animal + responsável + histórico de consultas
    async buscarFichaCompleta(id_animal: number): Promise<{
        animal: Animal | null;
        responsavel: Responsavel | null;
        consultas: Consulta[];
    }> {
        const animal = await animalService.buscarPorId(id_animal);

        // só busca o responsável e as consultas se encontrou o animal
        const [responsavel, consultas] = animal
            ? await Promise.all([
                  responsavelService.buscarPorId(animal.id_responsavel),
                  this.buscarConsultasDoAnimal(id_animal),
              ])
            : [null, []];

        return { animal, responsavel, consultas };
    },

    // atualiza os dados de um animal existente
    async atualizarAnimal(animal: Animal): Promise<void> {
        await animalService.atualizar(animal);
    },

    // atualiza os dados de um responsável existente
    async atualizarResponsavel(responsavel: Responsavel): Promise<void> {
        await responsavelService.atualizar(responsavel);
    },

    // remove o animal (a API já cuida da cascata das consultas dele) e,
    // se o responsável não tiver mais nenhum outro animal, remove ele também
    async removerPaciente(id_animal: number, id_responsavel: number): Promise<void> {
        await animalService.remover(id_animal);

        const outrosAnimais = await this.buscarAnimaisPorResponsavel(id_responsavel);
        if (outrosAnimais.length === 0) {
            await responsavelService.remover(id_responsavel);
        }
    },
};