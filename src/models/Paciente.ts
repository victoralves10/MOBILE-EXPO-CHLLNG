import type { ConsultaResumo } from "./Consulta";

// paciente na lista e na busca
export interface PacienteItem {
    id_animal: number;
    nm_animal: string;
    inicial_animal: string;
    especie_animal: string;
    raca_animal_exibicao: string;
    descricao_busca: string;
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
    descricao_busca: string;
}

export interface Regiao {
    id_regiao: number;
    nm_regiao: string;
}

export interface AnimalCompleto {
    id_animal: number;
    nm_animal: string;
    inicial_animal: string;
    especie_animal: string;
    especie_raca_exibicao: string;
    raca_animal: string | null;
    raca_animal_exibicao: string;
    dt_nascimento_animal: string | null;
    dt_nascimento_animal_exibicao: string;
    peso_animal: number | null;
    peso_animal_exibicao: string;
    rg_animal: string | null;
    rg_animal_exibicao: string;
    nr_microchip_animal: string | null;
    nr_microchip_animal_exibicao: string;
}

export interface ResponsavelCompleto {
    id_responsavel: number;
    nm_responsavel: string;
    cpf_responsavel: string;
    cpf_responsavel_exibicao: string;
    nr_telefone_responsavel: string;
    nr_telefone_responsavel_exibicao: string;
    id_regiao: number | null;
    nm_regiao: string | null;
    nm_regiao_exibicao: string;
    link_whatsapp: string;
}

export type ConsultaHistorico = Omit<ConsultaResumo, "animal">;

// campos do modal de edição do paciente
export interface FormularioPaciente {
    nm_animal: string;
    especie_animal: string;
    raca_animal: string;
    dt_nascimento_animal: string;
    peso_animal: string;
    rg_animal: string;
    nr_microchip_animal: string;
    nm_responsavel: string;
    cpf_responsavel: string;
    nr_telefone_responsavel: string;
    id_regiao: number | null;
}

// ficha completa do paciente
export interface Ficha {
    animal: AnimalCompleto;
    responsavel: ResponsavelCompleto & {
        outros_pacientes: number;
        aviso_edicao: string | null;
    };
    consultas: ConsultaHistorico[];
    total_consultas: number;
    total_consultas_exibicao: string;
    formulario: FormularioPaciente;
}

// corpo do PUT /pacientes/:id
export interface DadosPaciente {
    animal: {
        nm_animal: string;
        especie_animal: string;
        raca_animal: string;
        dt_nascimento_animal: string;
        peso_animal: string;
        rg_animal: string;
        nr_microchip_animal: string;
    };
    responsavel: {
        nm_responsavel: string;
        cpf_responsavel: string;
        nr_telefone_responsavel: string;
        id_regiao: number | null;
    };
}
