import { authStorage } from "../storage/authStorage";
import { authService } from "../services/authService";
import { User } from "../models/User";

// erro de rede de verdade (sem resposta do servidor) - diferente de senha errada
export class ErroSemConexao extends Error {
    constructor() {
        super("SEM_CONEXAO");
    }
}

function ehErroDeRede(error: any): boolean {
    return error?.response === undefined;
}

export const authController = {

    // chama o backend, salva token se der certo
    async fazerLogin(email: string, senha: string): Promise<boolean> {
        try {
            const { token, usuario } = await authService.login(email, senha);
            await authStorage.salvarSessao(token, usuario);
            return true;
        } catch (error) {
            if (ehErroDeRede(error)) throw new ErroSemConexao();
            return false; // senha errada
        }
    },

    // cadastra e já loga (o backend devolve token direto)
    async fazerCadastro(nome: string, email: string, senha: string): Promise<boolean> {
        try {
            const { token, usuario } = await authService.cadastrar(nome, email, senha);
            await authStorage.salvarSessao(token, usuario);
            return true;
        } catch (error) {
            if (ehErroDeRede(error)) throw new ErroSemConexao();
            return false;
        }
    },

    // tem token salvo? então tá logado
    async verificarSessao(): Promise<boolean> {
        const token = await authStorage.buscarToken();
        return token !== null;
    },

    async buscarUsuarioLogado(): Promise<User | null> {
        return await authStorage.buscarUsuario();
    },

    async fazerLogout(): Promise<void> {
        await authStorage.removerSessao();
    },
};