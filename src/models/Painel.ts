// números do consultório que aparecem no Perfil, todos calculados pelo backend
export interface Dashboard {
    consultas_realizadas_mes: number;
    consultas_agendadas: number;
    consultas_atrasadas: number;
    pacientes_cadastrados: number;
    pacientes_com_retorno: number;
    taxa_retorno_percentual: number;
    taxa_retorno_exibicao: string;
    taxa_retorno_descricao: string;
    possui_atrasadas: boolean;
    aviso_atrasadas: string | null;
}

// aviso que o backend deixou esperando o celular (ex: "📅 Sua próxima consulta é em 1 mês")
export interface Aviso {
    id_aviso: string;
    titulo: string;
    mensagem: string;
    id_consulta: number | null; // tocar na notificação abre essa consulta
}

// ---------- mapa da Home ----------

// cor de cada região, decidida pelo backend
export type NivelRegiao = "normal" | "atencao" | "surto";

export interface DoencaRegiao {
    ds_doenca: string;
    total: number;
    possivel_surto: boolean;
    descricao: string; // ex: "Cinomose: 6 casos (possível surto)"
}

// uma região no mapa, com os textos já prontos
export interface RegiaoMapa {
    id_regiao: number;
    nm_regiao: string;
    latitude: number;
    longitude: number;
    total_consultas: number;
    total_pacientes: number;
    consultas_agendadas: number;
    consultas_atrasadas: number;
    total_casos: number;
    possivel_surto: boolean;
    nivel: NivelRegiao;
    rotulo_nivel: string; // "Possível surto", "Atenção", "Tudo em dia"
    raio_metros: number;
    resumo: string; // "8 consultas · 5 pacientes"
    aviso_atrasadas: string | null;
    resumo_doencas: string | null;
    doencas: DoencaRegiao[];
}

// tudo que o mapa desenha (GET /mapa/ocorrencias)
export interface Mapa {
    centro: { latitude: number; longitude: number; latitude_delta: number; longitude_delta: number };
    titulo: string;
    resumo_geral: string | null;
    periodo_exibicao: string;
    legenda: { nivel: NivelRegiao; rotulo: string }[];
    legenda_surto: string;
    total_regioes: number;
    possui_surto: boolean;
    mensagem_vazio: string | null;
    regioes: RegiaoMapa[];
}
