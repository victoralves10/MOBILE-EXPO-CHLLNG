// formata data ISO (AAAA-MM-DDTHH:mm:ssZ) para o padrão brasileiro (DD/MM/AAAA) usando UTC
export function formatarData(dataIso: string): string {
    const data = new Date(dataIso);
    const dia = String(data.getUTCDate()).padStart(2, "0");
    const mes = String(data.getUTCMonth() + 1).padStart(2, "0");
    const ano = data.getUTCFullYear();
    return `${dia}/${mes}/${ano}`;
}

// converte data do padrão brasileiro (DD/MM/AAAA) para o formato esperado pela API (AAAA-MM-DD)
export function converterParaIso(dataBr: string): string {
    const partes = dataBr.split("/");
    if (partes.length !== 3) return dataBr;
    const [dia, mes, ano] = partes;
    return `${ano}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
}