export function senhaForte(senha: string): boolean {
    const temTamanho = senha.length >= 8;
    const temMaiuscula = /[A-Z]/.test(senha);
    const temMinuscula = /[a-z]/.test(senha);
    const temNumero = /[0-9]/.test(senha);
    const temEspecial = /[^A-Za-z0-9]/.test(senha);
    return temTamanho && temMaiuscula && temMinuscula && temNumero && temEspecial;
}

export function dataValida(data: string): boolean {
    return /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/.test(data);
}

export function horaValida(hora: string): boolean {
    return /^([01]\d|2[0-3]):[0-5]\d$/.test(hora);
}

export function cpfValido(cpf: string): boolean {
    return cpf.replace(/\D/g, "").length === 11;
}

export function telefoneValido(telefone: string): boolean {
    const digitos = telefone.replace(/\D/g, "").length;
    return digitos === 10 || digitos === 11;
}
