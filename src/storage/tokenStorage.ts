import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = "@clyvovet:token";

export const salvarToken = (token: string) => AsyncStorage.setItem(TOKEN_KEY, token);

export const buscarToken = () => AsyncStorage.getItem(TOKEN_KEY);

export const removerToken = () => AsyncStorage.removeItem(TOKEN_KEY);
