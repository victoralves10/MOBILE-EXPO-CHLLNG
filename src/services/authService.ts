import api from "./api";
import { RespostaSessao, User } from "../models/User";

// chamadas do backend ligadas a login e sessão
export const authService = {
    // faz login e recebe o token + dados do usuário
    async login(email: string, senha: string): Promise<RespostaSessao> {
        const resposta = await api.post("/auth/login", { email, senha });
        return resposta.data;
    },

    // cria a conta e já volta logado
    async cadastrar(nome: string, email: string, senha: string): Promise<RespostaSessao> {
        const resposta = await api.post("/auth/cadastro", { nome, email, senha });
        return resposta.data;
    },

    // busca o usuário logado, também serve pra ver se o token ainda vale
    async perfil(): Promise<User> {
        const resposta = await api.get("/auth/perfil");
        return resposta.data;
    },

    // avisa o backend que o usuário saiu
    async sair(): Promise<void> {
        await api.post("/auth/logout");
    },
};