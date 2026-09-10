import api from "./api";
import { User } from "../models/User";

export const usuarioService = {

    // GET /auth/perfil / dados do usuario logado, sempre buscados frescos da API
    async buscarDados(): Promise<User> {
        const resposta = await api.get("/auth/perfil");
        return resposta.data;
    },

    // PUT /auth/perfil / nome/email obrigatorios, senha opcional
    async editar(nome: string, email: string, senha?: string): Promise<User> {
        const body: any = { nome, email };
        if (senha) body.senha = senha;
        const resposta = await api.put("/auth/perfil", body);
        return resposta.data;
    },

    // DELETE /auth/conta / exige a senha atual pra confirmar
    async remover(senha: string): Promise<void> {
        await api.delete("/auth/conta", { data: { senha } });
    },
};

