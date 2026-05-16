export type StatusConsulta = "Agendado" | "Concluido" | "Atrasado";

export interface Consulta {
    id_consulta: string;
    historico_consulta: string;
    st_consulta: StatusConsulta;
    dt_consulta: string;
    hr_consulta: string;
    id_animal: string;
    id_responsavel: string;
}