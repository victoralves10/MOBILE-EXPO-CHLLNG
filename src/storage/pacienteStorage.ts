import AsyncStorage from "@react-native-async-storage/async-storage";
import { Responsavel } from "../models/Responsavel";
import { Animal } from "../models/Animal";

// chaves do asyncstorage onde os dados ficam salvos
const KEY_RESPONSAVEIS = "@clyvovet:responsaveis";
const KEY_ANIMAIS = "@clyvovet:animais";

export const pacienteStorage = {

    // ──────────────────────── RESPONSÁVEL ────────────────────────

    // lê todos os responsáveis do asyncstorage, retorna [] se vazio
    async buscarTodosResponsaveis(): Promise<Responsavel[]> {
        const data = await AsyncStorage.getItem(KEY_RESPONSAVEIS);
        return data ? JSON.parse(data) : [];
    },

    // sobrescreve a lista inteira de responsáveis no asyncstorage
    async salvarTodosResponsaveis(responsaveis: Responsavel[]): Promise<void> {
        await AsyncStorage.setItem(KEY_RESPONSAVEIS, JSON.stringify(responsaveis));
    },

    // adiciona um responsável no final da lista
    async adicionarResponsavel(responsavel: Responsavel): Promise<void> {
        const todos = await this.buscarTodosResponsaveis();
        todos.push(responsavel);
        await this.salvarTodosResponsaveis(todos);
    },

    // substitui o responsável com o mesmo id pelo atualizado
    async atualizarResponsavel(responsavelAtualizado: Responsavel): Promise<void> {
        const todos = await this.buscarTodosResponsaveis();
        const novos = todos.map(r =>
            r.id_responsavel === responsavelAtualizado.id_responsavel ? responsavelAtualizado : r
        );
        await this.salvarTodosResponsaveis(novos);
    },

    // remove o responsável com o id informado da lista
    async removerResponsavel(id_responsavel: string): Promise<void> {
        const todos = await this.buscarTodosResponsaveis();
        const filtrados = todos.filter(r => r.id_responsavel !== id_responsavel);
        await this.salvarTodosResponsaveis(filtrados);
    },

    // busca um responsável específico pelo id, retorna null se não encontrar
    async buscarResponsavelPorId(id: string): Promise<Responsavel | null> {
        const todos = await this.buscarTodosResponsaveis();
        return todos.find(r => r.id_responsavel === id) ?? null;
    },

    // ──────────────────────── ANIMAL ────────────────────────

    // lê todos os animais do asyncstorage, retorna [] se vazio
    async buscarTodosAnimais(): Promise<Animal[]> {
        const data = await AsyncStorage.getItem(KEY_ANIMAIS);
        return data ? JSON.parse(data) : [];
    },

    // sobrescreve a lista inteira de animais no asyncstorage
    async salvarTodosAnimais(animais: Animal[]): Promise<void> {
        await AsyncStorage.setItem(KEY_ANIMAIS, JSON.stringify(animais));
    },

    // adiciona um animal no final da lista
    async adicionarAnimal(animal: Animal): Promise<void> {
        const todos = await this.buscarTodosAnimais();
        todos.push(animal);
        await this.salvarTodosAnimais(todos);
    },

    // substitui o animal com o mesmo id pelo atualizado
    async atualizarAnimal(animalAtualizado: Animal): Promise<void> {
        const todos = await this.buscarTodosAnimais();
        const novos = todos.map(a =>
            a.id_animal === animalAtualizado.id_animal ? animalAtualizado : a
        );
        await this.salvarTodosAnimais(novos);
    },

    // remove o animal com o id informado da lista
    async removerAnimal(id_animal: string): Promise<void> {
        const todos = await this.buscarTodosAnimais();
        const filtrados = todos.filter(a => a.id_animal !== id_animal);
        await this.salvarTodosAnimais(filtrados);
    },

    // busca um animal específico pelo id, retorna null se não encontrar
    async buscarAnimalPorId(id: string): Promise<Animal | null> {
        const todos = await this.buscarTodosAnimais();
        return todos.find(a => a.id_animal === id) ?? null;
    },

    // retorna todos os animais vinculados a um responsável específico
    async buscarAnimaisPorResponsavel(id_responsavel: string): Promise<Animal[]> {
        const todos = await this.buscarTodosAnimais();
        return todos.filter(a => a.id_responsavel === id_responsavel);
    },
};