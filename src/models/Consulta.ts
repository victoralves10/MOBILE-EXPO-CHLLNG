import { AnimalCompleto, ResponsavelCompleto } from "./Paciente";

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

// detalhe completo: consulta + animal + responsável, tudo formatado pelo backend
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
}

// o que o app manda no PUT /consultas/:id
export interface DadosConsulta {
    historico_consulta: string;
    dt_consulta: string;
    hr_consulta: string;
    st_consulta: StatusConsulta;
    ds_doenca: string | null; // diagnóstico/suspeita (opcional), alimenta o mapa
}

// lembrete de uma consulta: o backend já diz quando avisar e o texto da notificação
// cada consulta tem até 2: "antes" (com antecedência) e "inicio" (na hora exata)
export interface Lembrete {
    id_lembrete: string; // ex: "consulta-12-antes", vira o id da notificação no celular
    id_consulta: number;
    tipo: "antes" | "inicio";
    disparar_em: string; // ex: "2026-11-25T08:15:00-03:00"
    titulo: string;
    mensagem: string;
}

// o que volta depois de criar ou editar
// lembretes vazio = não precisa avisar (concluída, atrasada...), então o app cancela os avisos
export interface RespostaConsultaSalva {
    mensagem: string;
    consulta: ConsultaDetalhe;
    lembretes: Lembrete[];
}
