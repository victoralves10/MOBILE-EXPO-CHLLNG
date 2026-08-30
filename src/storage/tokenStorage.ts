import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "@clyvovet:token";

// salva o token
export const salvarToken = (token: string) => AsyncStorage.setItem(TOKEN_KEY, token);

// busca o token
export const buscarToken = () => AsyncStorage.getItem(TOKEN_KEY);

// remove o token
export const removerToken = () => AsyncStorage.removeItem(TOKEN_KEY);