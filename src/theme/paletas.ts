// todas as cores do app moram aqui
// as duas paletas têm os mesmos nomes; os estilos usam o nome ("superficie", "texto"...)
// e a cor certa entra sozinha quando o tema muda

export interface Cores {
    // fundos
    fundo: string; // fundo das telas
    superficie: string; // cards, modais, barra de abas
    superficieAlt: string; // campos de texto, chips, trilhas
    borda: string;
    sombra: string;
    fundoModal: string; // escurecido atrás dos modais

    // textos
    texto: string;
    textoSecundario: string;
    textoSuave: string;
    textoSobreCor: string; // texto em cima de botão colorido

    // marca
    primaria: string;
    primariaForte: string; // fim do degradê e botão pressionado
    secundaria: string;

    // cores de apoio, cada uma com um papel fixo
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

// tema claro: fundo levemente lilás, cards brancos e cores vivas
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

// tema escuro: azul-noite em vez de preto puro e cores um tom mais suaves pra não cansar a vista
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

// cor de cada status de consulta (o status em si vem do backend)
export function corDoStatus(c: Cores, status: "Agendado" | "Atrasado" | "Concluido") {
    return { Agendado: c.agendado, Atrasado: c.atrasado, Concluido: c.concluido }[status];
}

// deixa uma cor transparente pra usar de fundo de ícone/selo (ex: transparente(c.primaria, 0.12))
export function transparente(hex: string, opacidade: number) {
    const alfa = Math.round(opacidade * 255).toString(16).padStart(2, "0");
    return hex + alfa;
}
