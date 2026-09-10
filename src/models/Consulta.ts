export type StatusConsulta = "Agendado" | "Concluido" | "Atrasado";

export interface Consulta {
    id_consulta: number;
    historico_consulta: string;
    st_consulta: StatusConsulta;
    dt_consulta: string;
    hr_consulta: string;
    id_animal: number;
}