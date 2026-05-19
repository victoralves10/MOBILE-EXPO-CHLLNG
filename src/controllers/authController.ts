import { authStorage } from "../storage/authStorage";
import { User } from "../models/User";

// usuário fixo para validação, como não tem backend, o login é simulado aqui
const USUARIO_MOCK: User = {
    email: "teste@email.com",
    senha: "123456",
    nm_usuario: "Veterinario",
};

export const authController = {

    // valida email e senha, se bater com o mock, salva a sessão e retorna true
    async fazerLogin(email: string, senha: string): Promise<boolean> {
        if (email === USUARIO_MOCK.email && senha === USUARIO_MOCK.senha) {
            await authStorage.salvarUsuario(USUARIO_MOCK);
            return true;
        }
        return false;
    },

    // verifica se tem sessão salva no asyncstorage, usado pra decidir onde o app começa
    async verificarSessao(): Promise<boolean> {
        const user = await authStorage.buscarUsuario();
        return user !== null;
    },

    // retorna os dados do usuário logado (nome, email etc)
    async buscarUsuarioLogado(): Promise<User | null> {
        return await authStorage.buscarUsuario();
    },

    // remove a sessão do asyncstorage, equivale ao logout
    async fazerLogout(): Promise<void> {
        await authStorage.removerUsuario();
    },
};