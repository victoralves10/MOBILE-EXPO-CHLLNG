// tipos dos dados que vêm da API — centralizados aqui, igual o padrão usado no resto do app

export interface ConsultaApi {
    id_consulta: number;
    historico_consulta: string;
    st_consulta: "Agendado" | "Concluido" | "Atrasado";
    dt_consulta: string;
    hr_consulta: string;
    id_animal: number;
}

export interface AnimalApi {
    id_animal: number;
    nm_animal: string;
    especie_animal: string;
    raca_animal: string | null;
    id_responsavel: number;
}