import AsyncStorage from "@react-native-async-storage/async-storage";
import { Consulta } from "../models/Consulta";

// chave do asyncstorage onde as consultas ficam salvas
const KEY_CONSULTAS = "@clyvovet:consultas";

export const consultaStorage = {

    // lê todas as consultas do asyncstorage — retorna [] se vazio
    async buscarTodas(): Promise<Consulta[]> {
        const data = await AsyncStorage.getItem(KEY_CONSULTAS);
        return data ? JSON.parse(data) : [];
    },

    // sobrescreve a lista inteira de consultas no asyncstorage
    async salvarTodas(consultas: Consulta[]): Promise<void> {
        await AsyncStorage.setItem(KEY_CONSULTAS, JSON.stringify(consultas));
    },

    // adiciona uma consulta no final da lista
    async adicionar(consulta: Consulta): Promise<void> {
        const todas = await this.buscarTodas();
        todas.push(consulta);
        await this.salvarTodas(todas);
    },

    // substitui a consulta com o mesmo id pela atualizada
    async atualizar(consultaAtualizada: Consulta): Promise<void> {
        const todas = await this.buscarTodas();
        const novas = todas.map(c =>
            c.id_consulta === consultaAtualizada.id_consulta ? consultaAtualizada : c
        );
        await this.salvarTodas(novas);
    },

    // remove a consulta com o id informado da lista
    async remover(id_consulta: string): Promise<void> {
        const todas = await this.buscarTodas();
        const filtradas = todas.filter(c => c.id_consulta !== id_consulta);
        await this.salvarTodas(filtradas);
    },
};