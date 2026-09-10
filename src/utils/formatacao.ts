// formata uma data ISO (a que vem do banco, tipo "2026-08-25T00:00:00.000Z")
// pro formato brasileiro DD/MM/AAAA. Usa os métodos UTC de propósito — se
// usasse os métodos locais, em fusos negativos (como o do Brasil) a data
// podia "voltar" um dia (25/08 virando 24/08).
export function formatarData(dataIso: string): string {
    const data = new Date(dataIso);
    const dia = String(data.getUTCDate()).padStart(2, "0");
    const mes = String(data.getUTCMonth() + 1).padStart(2, "0");
    const ano = data.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
}