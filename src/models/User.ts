// usuário logado
export interface User {
    id_usuario: number;
    nm_usuario: string;
    email_usuario: string;
    inicial_usuario: string;
}

// resposta do login e do cadastro
export interface RespostaSessao {
    mensagem: string;
    token: string;
    usuario: User;
}
