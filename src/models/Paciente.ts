import type { ConsultaResumo } from "./Consulta";

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

// animal completo (detalhe da consulta e ficha), já com os textos de tela prontos
export interface AnimalCompleto {
    id_animal: number;
    nm_animal: string;
    inicial_animal: string;
    especie_animal: string;
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

// responsável completo, com o link do WhatsApp já montado pelo backend
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

// consulta no histórico da ficha (igual ao card, só que sem repetir o animal)
export type ConsultaHistorico = Omit<ConsultaResumo, "animal">;

// ficha completa do paciente, tudo numa resposta só
export interface Ficha {
    animal: AnimalCompleto;
    responsavel: ResponsavelCompleto & {
        outros_pacientes: number;
        aviso_edicao: string | null; // aviso pronto do backend quando o responsável tem outros pacientes
    };
    consultas: ConsultaHistorico[];
    total_consultas: number;
}

// o que o app manda no PUT /pacientes/:id
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