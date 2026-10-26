import api from "./api";
import { User } from "../models/User";

// chamadas do backend pra mexer na conta do usuário
export const usuarioService = {
    // edita nome e e-mail, a senha só vai se o usuário digitou uma nova
    async editar(nome: string, email: string, senha?: string): Promise<{ mensagem: string; usuario: User }> {
        const resposta = await api.put("/auth/perfil", { nome, email, ...(senha ? { senha } : {}) });
        return resposta.data;
    },

    // apaga a conta, precisa da senha atual (se errar, o backend devolve 403)
    async remover(senha: string): Promise<{ mensagem: string }> {
        const resposta = await api.delete("/auth/conta", { data: { senha } });
        return resposta.data;
    },
};