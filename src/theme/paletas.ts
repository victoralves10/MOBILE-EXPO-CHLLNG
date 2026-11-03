// cores do app

export interface Cores {
    // fundos
    fundo: string;
    superficie: string;
    superficieAlt: string;
    borda: string;
    sombra: string;
    fundoModal: string;

    // textos
    texto: string;
    textoSecundario: string;
    textoSuave: string;
    textoSobreCor: string;

    // marca
    primaria: string;
    primariaForte: string;
    secundaria: string;

    // cores de apoio
    agendado: string;
    concluido: string;
    atrasado: string;
    aviso: string;
    pacientes: string;
    whatsapp: string;
    rosa: string;
    ceu: string;
    laranja: string;
}

// tema claro
export const paletaClara: Cores = {
    fundo: "#F4F4FB",
    superficie: "#FFFFFF",
    superficieAlt: "#EEEEF7",
    borda: "#E2E3EE",
    sombra: "#1B1A3A",
    fundoModal: "rgba(15, 14, 35, 0.55)",

    texto: "#17172B",
    textoSecundario: "#5D5F7A",
    textoSuave: "#9A9CB3",
    textoSobreCor: "#FFFFFF",

    primaria: "#6C5CE7",
    primariaForte: "#4E3FD0",
    secundaria: "#00B8A9",

    agendado: "#6C5CE7",
    concluido: "#16A34A",
    atrasado: "#F0436A",
    aviso: "#F59E0B",
    pacientes: "#00B8A9",
    whatsapp: "#25D366",
    rosa: "#EC4899",
    ceu: "#0EA5E9",
    laranja: "#F97316",
};

// tema escuro
export const paletaEscura: Cores = {
    fundo: "#0E0F1E",
    superficie: "#181A2E",
    superficieAlt: "#23263F",
    borda: "#2D3050",
    sombra: "#000000",
    fundoModal: "rgba(0, 0, 0, 0.65)",

    texto: "#EDEDF7",
    textoSecundario: "#A9ABC6",
    textoSuave: "#6E7192",
    textoSobreCor: "#FFFFFF",

    primaria: "#8B7CFF",
    primariaForte: "#6C5CE7",
    secundaria: "#2DD4BF",

    agendado: "#8B7CFF",
    concluido: "#34D399",
    atrasado: "#FB7193",
    aviso: "#FBBF24",
    pacientes: "#2DD4BF",
    whatsapp: "#25D366",
    rosa: "#F472B6",
    ceu: "#38BDF8",
    laranja: "#FB923C",
};

// cor de cada status de consulta
export function corDoStatus(c: Cores, status: "Agendado" | "Atrasado" | "Concluido") {
    return { Agendado: c.agendado, Atrasado: c.atrasado, Concluido: c.concluido }[status];
}

// cor com transparência
export function transparente(hex: string, opacidade: number) {
    const alfa = Math.round(opacidade * 255).toString(16).padStart(2, "0");
    return hex + alfa;
}
