import api from "./api";

export const authService = {

    // POST /auth/login — email/senha, devolve { token, usuario }
    async login(email: string, senha: string) {
        const resposta = await api.post("/auth/login", { email, senha });
        return resposta.data; // { token, usuario: { id_usuario, nm_usuario, email_usuario } }
    },

    // POST /auth/cadastro — nome/email/senha, devolve { token, usuario } (já loga direto)
    async cadastrar(nome: string, email: string, senha: string) {
        const resposta = await api.post("/auth/cadastro", { nome, email, senha });
        return resposta.data;
    },
};