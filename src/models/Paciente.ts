// paciente na lista e na busca (animal + responsável resumidos)
export interface PacienteItem {
    id_animal: number;
    nm_animal: string;
    inicial_animal: string;
    especie_animal: string;
    raca_animal_exibicao: string;
    nm_responsavel: string;
    nr_telefone_responsavel_exibicao: string;
    link_whatsapp: string;
}

// responsável na busca
export interface ResponsavelItem {
    id_responsavel: number;
    nm_responsavel: string;
    inicial_responsavel: string;
    cpf_responsavel_exibicao: string;
    nr_telefone_responsavel_exibicao: string;
    nm_regiao_exibicao: string;
}

// região atendida (usada no cadastro do responsável e no mapa)
export interface Regiao {
    id_regiao: number;
    nm_regiao: string;
}
