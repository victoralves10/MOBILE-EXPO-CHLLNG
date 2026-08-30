// senha forte: 8+ caracteres, maiúscula, minúscula, número e especial
export function senhaForte(senha: string): boolean {
    const temTamanho = senha.length >= 8;
    const temMaiuscula = /[A-Z]/.test(senha);
    const temMinuscula = /[a-z]/.test(senha);
    const temNumero = /[0-9]/.test(senha);
    const temEspecial = /[^A-Za-z0-9]/.test(senha);
    return temTamanho && temMaiuscula && temMinuscula && temNumero && temEspecial;
}

// email básico tipo algo@algo.algo, não confere se existe de verdade
export function emailValido(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}