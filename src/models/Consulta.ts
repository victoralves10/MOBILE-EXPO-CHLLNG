import { AnimalCompleto, ResponsavelCompleto } from "./Paciente";

export type StatusConsulta = "Agendado" | "Concluido" | "Atrasado";

export type AbaConsulta = "agendadas" | "atrasadas" | "concluidas";

export interface AnimalResumo {
    id_animal: number;
    nm_animal: string;
    inicial_animal: string;
    especie_animal: string;
    raca_animal_exibicao: string;
    especie_raca_exibicao: string;
}

// card de consulta
export interface ConsultaResumo {
    id_consulta: number;
    historico_consulta: string;
    dt_consulta: string;
    dt_consulta_exibicao: string;
    hr_consulta: string;
    data_hora_exibicao: string;
    st_consulta: StatusConsulta;
    st_consulta_rotulo: string;
    link_consulta_online: string;
    animal: AnimalResumo;
}

// corpo do POST /consultas (os 3 casos)
export interface NovaConsulta {
    consulta: {
        historico_consulta: string;
        dt_consulta: string;
        hr_consulta: string;
        st_consulta: StatusConsulta;
        ds_doenca: string | null;
    };
    paciente:
        | { id_animal: number | null }
        | {
              novo: {
                  nm_animal: string;
                  especie_animal: string;
                  raca_animal: string;
                  dt_nascimento_animal: string;
                  peso_animal: string;
                  rg_animal: string;
                  nr_microchip_animal: string;
                  responsavel:
                      | { id_responsavel: number | null }
                      | { novo: { nm_responsavel: string; cpf_responsavel: string; nr_telefone_responsavel: string; id_regiao: number | null } };
              };
          };
}

// corpo do PUT /consultas/:id
export interface DadosConsulta {
    historico_consulta: string;
    dt_consulta: string;
    hr_consulta: string;
    st_consulta: StatusConsulta;
    ds_doenca: string | null;
}

// detalhe da consulta
export interface ConsultaDetalhe {
    id_consulta: number;
    historico_consulta: string;
    dt_consulta: string;
    dt_consulta_exibicao: string;
    hr_consulta: string;
    data_hora_exibicao: string;
    st_consulta: StatusConsulta;
    st_consulta_rotulo: string;
    ds_doenca: string | null;
    ds_doenca_exibicao: string;
    link_consulta_online: string;
    animal: AnimalCompleto;
    responsavel: ResponsavelCompleto;
    formulario: DadosConsulta;
}

// lembrete de uma consulta
export interface Lembrete {
    id_lembrete: string;
    id_consulta: number;
    tipo: "antes" | "inicio";
    disparar_em: string;
    titulo: string;
    mensagem: string;
}

// resposta de criar ou editar
export interface RespostaConsultaSalva {
    mensagem: string;
    consulta: ConsultaDetalhe;
    lembretes: Lembrete[];
}
