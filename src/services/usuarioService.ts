import api from "./api";
import { User } from "../models/User";

// conta do usuário
export const usuarioService = {
    async editar(nome: string, email: string, senha?: string): Promise<{ mensagem: string; usuario: User }> {
        const resposta = await api.put("/auth/perfil", { nome, email, senha });
        return resposta.data;
    },

    async remover(senha: string): Promise<{ mensagem: string }> {
        const resposta = await api.delete("/auth/conta", { data: { senha } });
        return resposta.data;
    },
};
