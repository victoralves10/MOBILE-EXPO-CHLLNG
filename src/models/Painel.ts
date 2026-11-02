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

// aviso que o backend deixou esperando o celular (ex: "📅 Sua próxima consulta é em 1 mês")
export interface Aviso {
    id_aviso: string;
    titulo: string;
    mensagem: string;
    id_consulta: number | null; // tocar na notificação abre essa consulta
}
