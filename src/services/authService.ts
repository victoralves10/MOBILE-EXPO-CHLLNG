import axios from "axios";

// url da api
const API_URL = "https://apirest-node-chllng.onrender.com";

export const authService = {

    // POST /auth/login - email/senha, devolve { token, usuario }
    async login(email: string, senha: string) {
        const resposta = await axios.post(`${API_URL}/auth/login`, { email, senha });
        return resposta.data; // { token, usuario: { id_usuario, nm_usuario, email_usuario } }
    },

    // POST /auth/cadastro - nome/email/senha, devolve { token, usuario } (já loga direto)
    async cadastrar(nome: string, email: string, senha: string) {
        const resposta = await axios.post(`${API_URL}/auth/cadastro`, { nome, email, senha });
        return resposta.data;
    },
};