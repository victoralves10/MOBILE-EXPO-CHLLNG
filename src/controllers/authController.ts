import * as tokenStorage from "../storage/tokenStorage";
import { authService } from "../services/authService";
import { usuarioService } from "../services/usuarioService";

// erro de rede de verdade (sem resposta do servidor) - diferente de senha errada
export class ErroSemConexao extends Error {
    constructor() {
        super("SEM_CONEXAO");
    }
}

// senha errada especificamente (usado em apagar conta, pra distinguir de outros erros)
export class ErroSenhaIncorreta extends Error {
    constructor() {
        super("SENHA_INCORRETA");
    }
}

function ehErroDeRede(error: any): boolean {
    return error?.response === undefined;
}

export const authController = {

    // chama o backend, salva só o token se der certo (dados do usuário
    // não ficam salvos aqui — sempre são buscados frescos via usuarioService)
    async fazerLogin(email: string, senha: string): Promise<boolean> {
        try {
            const { token } = await authService.login(email, senha);
            await tokenStorage.salvarToken(token);
            return true;
        } catch (error) {
            if (ehErroDeRede(error)) throw new ErroSemConexao();
            return false; // senha errada
        }
    },

    // cadastra e já loga (o backend devolve token direto)
    async fazerCadastro(nome: string, email: string, senha: string): Promise<boolean> {
        try {
            const { token } = await authService.cadastrar(nome, email, senha);
            await tokenStorage.salvarToken(token);
            return true;
        } catch (error) {
            if (ehErroDeRede(error)) throw new ErroSemConexao();
            return false;
        }
    },

    // atualiza nome/email/senha — a tela busca os dados atualizados de novo depois
    async atualizarPerfil(nome: string, email: string, senha?: string): Promise<void> {
        try {
            await usuarioService.editar(nome, email, senha);
        } catch (error) {
            if (ehErroDeRede(error)) throw new ErroSemConexao();
            throw error;
        }
    },

    // apaga a conta no backend (que já cuida da cascata) e limpa o token local
    async apagarConta(senha: string): Promise<void> {
        try {
            await usuarioService.remover(senha);
            await tokenStorage.removerToken();
        } catch (error: any) {
            if (ehErroDeRede(error)) throw new ErroSemConexao();
            if (error?.response?.status === 401) throw new ErroSenhaIncorreta();
            throw error;
        }
    },

    // tem token salvo? então tá logado
    async verificarSessao(): Promise<boolean> {
        const token = await tokenStorage.buscarToken();
        return token !== null;
    },

    async fazerLogout(): Promise<void> {
        await tokenStorage.removerToken();
    },
};