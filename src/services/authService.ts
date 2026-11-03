import api from "./api";
import { RespostaSessao, User } from "../models/User";

// login, cadastro e sessão
export const authService = {
    async login(email: string, senha: string): Promise<RespostaSessao> {
        const resposta = await api.post("/auth/login", { email, senha });
        return resposta.data;
    },

    async cadastrar(nome: string, email: string, senha: string, confirmarSenha: string): Promise<RespostaSessao> {
        const resposta = await api.post("/auth/cadastro", { nome, email, senha, confirmar_senha: confirmarSenha });
        return resposta.data;
    },

    async perfil(): Promise<User> {
        const resposta = await api.get("/auth/perfil");
        return resposta.data;
    },

    async sair(): Promise<void> {
        await api.post("/auth/logout");
    },
};
