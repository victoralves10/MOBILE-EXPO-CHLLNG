export type StatusConsulta = "Agendado" | "Concluido" | "Atrasado";

// as 3 abas da tela de consultas, cada uma é um endpoint do backend
export type AbaConsulta = "agendadas" | "atrasadas" | "concluidas";

// resumo do animal que vem junto em cada card
export interface AnimalResumo {
    id_animal: number;
    nm_animal: string;
    inicial_animal: string;
    especie_animal: string;
    raca_animal_exibicao: string;
}

// card de consulta do jeito que o backend devolve, já com tudo formatado
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

// o que o app manda no POST /consultas (os 3 casos da especificação)
export interface NovaConsulta {
    consulta: {
        historico_consulta: string;
        dt_consulta: string;
        hr_consulta: string;
        st_consulta: StatusConsulta;
        ds_doenca: string | null;
    };
    paciente:
        | { id_animal: number | null } // caso 1: paciente já cadastrado
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
                      | { id_responsavel: number | null } // caso 2: responsável já cadastrado
                      | { novo: { nm_responsavel: string; cpf_responsavel: string; nr_telefone_responsavel: string; id_regiao: number | null } }; // caso 3
              };
          };
}

// o que volta depois de salvar (o lembrete é usado na feature de notificações)
export interface RespostaConsultaSalva {
    mensagem: string;
    consulta: { id_consulta: number };
    lembrete: unknown;
}

// (temporário) modelo antigo, sai quando o detalhe da consulta for refeito
export interface Consulta {
    id_consulta: number;
    historico_consulta: string;
    st_consulta: StatusConsulta;
    dt_consulta: string;
    hr_consulta: string;
    id_animal: number;
}
