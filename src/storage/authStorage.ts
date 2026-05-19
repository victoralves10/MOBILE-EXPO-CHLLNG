import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../models/User";

// chave do asyncstorage onde o usuário logado fica salvo
const KEY_USER = "@clyvovet:usuario_logado";

export const authStorage = {

    // salva os dados do usuário no asyncstorage (chamado no login)
    async salvarUsuario(user: User): Promise<void> {
        await AsyncStorage.setItem(KEY_USER, JSON.stringify(user));
    },

    // busca o usuário salvo — retorna null se não tiver ninguém logado
    async buscarUsuario(): Promise<User | null> {
        const data = await AsyncStorage.getItem(KEY_USER);
        return data ? JSON.parse(data) : null;
    },

    // remove o usuário do asyncstorage (chamado no logout)
    async removerUsuario(): Promise<void> {
        await AsyncStorage.removeItem(KEY_USER);
    },
};