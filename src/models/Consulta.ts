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

// (temporário) modelo antigo, sai quando o detalhe da consulta for refeito
export interface Consulta {
    id_consulta: number;
    historico_consulta: string;
    st_consulta: StatusConsulta;
    dt_consulta: string;
    hr_consulta: string;
    id_animal: number;
}