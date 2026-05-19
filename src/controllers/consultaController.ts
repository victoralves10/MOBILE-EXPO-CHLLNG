import { consultaStorage } from "../storage/consultaStorage";
import { pacienteStorage } from "../storage/pacienteStorage";
import { Consulta } from "../models/Consulta";
import { Responsavel } from "../models/Responsavel";
import { Animal } from "../models/Animal";

// gera um id único combinando timestamp + string aleatória
function gerarId(): string {
    return Date.now().toString() + Math.random().toString(36).substring(2, 7);
}

export const consultaController = {

    // retorna todas as consultas salvas
    async buscarTodas(): Promise<Consulta[]> {
        return await consultaStorage.buscarTodas();
    },

    // busca uma consulta específica pelo id
    async buscarPorId(id_consulta: string): Promise<Consulta | null> {
        const todas = await consultaStorage.buscarTodas();
        return todas.find(c => c.id_consulta === id_consulta) ?? null;
    },

    // cria uma nova consulta junto com o animal e responsável
    async criar(
        dados: Omit<Consulta, "id_consulta">,
        responsavel: Omit<Responsavel, "id_responsavel">,
        animal: Omit<Animal, "id_animal" | "id_responsavel">
    ): Promise<void> {

        // verifica se o responsável já existe pelo cpf para evitar duplicadas
        const todosResponsaveis = await pacienteStorage.buscarTodosResponsaveis();
        let responsavelExistente = todosResponsaveis.find(
            r => r.cpf_responsavel === responsavel.cpf_responsavel
        );

        let id_responsavel: string;

        if (responsavelExistente) {
            id_responsavel = responsavelExistente.id_responsavel;
        } else {
            id_responsavel = gerarId();
            await pacienteStorage.adicionarResponsavel({
                ...responsavel,
                id_responsavel,
            });
        }

        // verifica se o animal já existe pelo microchip, evita duplicadas
        const todosAnimais = await pacienteStorage.buscarTodosAnimais();
        let animalExistente = todosAnimais.find(
            a => a.nr_microchip_animal === animal.nr_microchip_animal
        );

        let id_animal: string;

        if (animalExistente) {
            id_animal = animalExistente.id_animal;
        } else {
            id_animal = gerarId();
            await pacienteStorage.adicionarAnimal({
                ...animal,
                id_animal,
                id_responsavel,
            });
        }

        // monta e salva a consulta com os ids gerados
        const novaConsulta: Consulta = {
            ...dados,
            id_consulta: gerarId(),
            id_animal,
            id_responsavel,
        };

        await consultaStorage.adicionar(novaConsulta);
    },

    // atualiza os dados de uma consulta existente
    async atualizar(consulta: Consulta): Promise<void> {
        await consultaStorage.atualizar(consulta);
    },

    // remove uma consulta pelo id
    async remover(id_consulta: string): Promise<void> {
        await consultaStorage.remover(id_consulta);
    },
};