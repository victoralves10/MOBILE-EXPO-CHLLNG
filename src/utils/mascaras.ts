// máscaras que vão aparecendo enquanto o usuário digita
// o backend aceita com ou sem máscara, então manda do jeito que está

const somenteDigitos = (valor: string) => valor.replace(/\D/g, "");

// 12345678909 → 123.456.789-09
export function mascararCpf(valor: string) {
    return somenteDigitos(valor)
        .slice(0, 11)
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

// 11999999999 → (11) 99999-9999
export function mascararTelefone(valor: string) {
    const digitos = somenteDigitos(valor).slice(0, 11);
    const meio = digitos.length <= 10 ? 4 : 5;
    return digitos
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(new RegExp(`(\\d{${meio}})(\\d)`), "$1-$2");
}

// deixa só número e uma vírgula (ex: 12,5)
export function mascararPeso(valor: string) {
    return valor.replace(".", ",").replace(/[^\d,]/g, "").replace(/,(?=.*,)/g, "");
}

// só pra mostrar a data que o próprio usuário escolheu: 2026-12-10 → 10/12/2026
export function dataParaTela(iso: string) {
    return iso ? iso.split("-").reverse().join("/") : "";
}
