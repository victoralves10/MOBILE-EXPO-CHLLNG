import { authStorage } from "../storage/authStorage";
import { authService } from "../services/authService";
import { User } from "../models/User";

export const authController = {

    // chama o backend - se der certo, salva token+usuário e retorna true
    async fazerLogin(email: string, senha: string): Promise<boolean> {
        try {
            const { token, usuario } = await authService.login(email, senha);
            await authStorage.salvarSessao(token, usuario);
            return true;
        } catch (error) {
            // qualquer falha aqui é "login não deu certo"
            return false;
        }
    },

    // chama o cadastro no backend - se der certo, ja salva a sessão (loga direto sem precisar logar de novo)
    async fazerCadastro(nome: string, email: string, senha: string): Promise<boolean> {
        try {
            const { token, usuario } = await authService.cadastrar(nome, email, senha);
            await authStorage.salvarSessao(token, usuario);
            return true;
        } catch (error) {
            return false;
        }
    },

    // verifica se tem sessão salva no asyncstorage, usado pra ver onde o app começa
    async verificarSessao(): Promise<boolean> {
        const token = await authStorage.buscarToken();
        return token !== null;
    },

    // retorna os dados do usuario logado (nome, email etc)
    async buscarUsuarioLogado(): Promise<User | null> {
        return await authStorage.buscarUsuario();
    },

    // remove a sessão do asyncstorage, tipo ao logout
    async fazerLogout(): Promise<void> {
        await authStorage.removerSessao();
    },
};