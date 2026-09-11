import * as tokenStorage from "../storage/tokenStorage";
import { authService } from "../services/authService";
import { usuarioService } from "../services/usuarioService";

export class ErroSemConexao extends Error {
    constructor() {
        super("SEM_CONEXAO");
    }
}

export class ErroSenhaIncorreta extends Error {
    constructor() {
        super("SENHA_INCORRETA");
    }
}

function ehErroDeRede(error: any): boolean {
    return error?.response === undefined;
}

export const authController = {

    async fazerLogin(email: string, senha: string): Promise<boolean> {
        try {
            const { token } = await authService.login(email, senha);
            await tokenStorage.salvarToken(token);
            return true;
        } catch (error) {
            console.error("[authController.fazerLogin]", error);
            if (ehErroDeRede(error)) throw new ErroSemConexao();
            return false;
        }
    },

    async fazerCadastro(nome: string, email: string, senha: string): Promise<boolean> {
        try {
            const { token } = await authService.cadastrar(nome, email, senha);
            await tokenStorage.salvarToken(token);
            return true;
        } catch (error) {
            console.error("[authController.fazerCadastro]", error);
            if (ehErroDeRede(error)) throw new ErroSemConexao();
            return false;
        }
    },

    async atualizarPerfil(nome: string, email: string, senha?: string): Promise<void> {
        try {
            await usuarioService.editar(nome, email, senha);
        } catch (error) {
            console.error("[authController.atualizarPerfil]", error);
            if (ehErroDeRede(error)) throw new ErroSemConexao();
            throw error;
        }
    },

    async apagarConta(senha: string): Promise<void> {
        try {
            await usuarioService.remover(senha);
            await tokenStorage.removerToken();
        } catch (error: any) {
            console.error("[authController.apagarConta]", error);
            if (ehErroDeRede(error)) throw new ErroSemConexao();
            if (error?.response?.status === 401) throw new ErroSenhaIncorreta();
            throw error;
        }
    },

    async verificarSessao(): Promise<boolean> {
        try {
            const token = await tokenStorage.buscarToken();
            return token !== null;
        } catch (error) {
            console.error("[authController.verificarSessao]", error);
            return false;
        }
    },

    async fazerLogout(): Promise<void> {
        try {
            await tokenStorage.removerToken();
        } catch (error) {
            console.error("[authController.fazerLogout]", error);
        }
    },
};
