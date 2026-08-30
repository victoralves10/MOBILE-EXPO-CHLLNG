import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../models/User";

// Chaves do AsyncStorage

// guarda o token de acesso do usuário logado
const KEY_TOKEN = "@clyvovet:token";

// guarda os dados do usuário logado, tipo nome e e-mail
const KEY_USER = "@clyvovet:usuario_logado";

export const authStorage = {

    // salva a sessão depois que o login ou cadastro da certo
    async salvarSessao(token: string, user: User): Promise<void> {
        await AsyncStorage.setItem(KEY_TOKEN, token);
        await AsyncStorage.setItem(KEY_USER, JSON.stringify(user));
    },

    // pega o token para usar nas requisições protegidas usado pelo authService para montar o header
    async buscarToken(): Promise<string | null> {
        return await AsyncStorage.getItem(KEY_TOKEN);
    },

    // pega os dados do usuário para mostrar no perfil
    async buscarUsuario(): Promise<User | null> {
        const data = await AsyncStorage.getItem(KEY_USER);
        return data ? JSON.parse(data) : null;
    },

    // limpa tudo quando a pessoa sai da conta
    async removerSessao(): Promise<void> {
        await AsyncStorage.removeItem(KEY_TOKEN);
        await AsyncStorage.removeItem(KEY_USER);
    },
};