// usuário do jeito que o backend devolve
export interface User {
    id_usuario: number;
    nm_usuario: string;
    email_usuario: string;
    inicial_usuario: string;
}

// o que volta do login e do cadastro
export interface RespostaSessao {
    mensagem: string;
    token: string;
    usuario: User;
}