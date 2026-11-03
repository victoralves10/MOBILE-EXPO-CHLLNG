// números do consultório
export interface Dashboard {
    consultas_realizadas_mes: number;
    consultas_agendadas: number;
    consultas_atrasadas: number;
    pacientes_cadastrados: number;
    pacientes_com_retorno: number;
    taxa_retorno_percentual: number;
    taxa_retorno_exibicao: string;
    taxa_retorno_descricao: string;
    resumo_home: string;
    possui_atrasadas: boolean;
    aviso_atrasadas: string | null;
}

// aviso que aparece na hora
export interface Aviso {
    id_aviso: string;
    titulo: string;
    mensagem: string;
    id_consulta: number | null;
}

// ---------- mapa da Home ----------

export type NivelRegiao = "normal" | "atencao" | "surto";

export interface DoencaRegiao {
    ds_doenca: string;
    total: number;
    possivel_surto: boolean;
    descricao: string;
}

// região no mapa
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
    rotulo_nivel: string;
    raio_metros: number;
    resumo: string;
    aviso_atrasadas: string | null;
    resumo_doencas: string | null;
    doencas: DoencaRegiao[];
}

// mapa
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
