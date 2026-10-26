// números do consultório que aparecem no Perfil, todos calculados pelo backend
export interface Dashboard {
    consultas_realizadas_mes: number;
    consultas_agendadas: number;
    consultas_atrasadas: number;
    pacientes_cadastrados: number;
    pacientes_com_retorno: number;
    taxa_retorno_percentual: number;
    taxa_retorno_exibicao: string;
    taxa_retorno_descricao: string;
    possui_atrasadas: boolean;
    aviso_atrasadas: string | null;
}