import api from "./api";
import {
    AbaConsulta,
    Consulta,
    ConsultaDetalhe,
    ConsultaResumo,
    DadosConsulta,
    NovaConsulta,
    RespostaConsultaSalva,
} from "../models/Consulta";

// chamadas do backend ligadas a consultas
export const consultaService = {
    // lista de uma aba (agendadas, atrasadas ou concluidas), a busca é pelo nome do animal
    async listarPorAba(aba: AbaConsulta, busca: string): Promise<ConsultaResumo[]> {
        const resposta = await api.get(`/consultas/${aba}`, { params: busca ? { busca } : undefined });
        return resposta.data;
    },

    // próximas consultas pro carrossel da Home
    async listarProximas(): Promise<ConsultaResumo[]> {
        const resposta = await api.get("/consultas/proximas");
        return resposta.data;
    },

    // detalhe completo, já com animal e responsável (uma requisição só)
    async buscarDetalhe(id: number): Promise<ConsultaDetalhe> {
        const resposta = await api.get(`/consultas/${id}`);
        return resposta.data;
    },

    // cria a consulta; o backend resolve paciente e responsável numa tacada só
    async criar(dados: NovaConsulta): Promise<RespostaConsultaSalva> {
        const resposta = await api.post("/consultas", dados);
        return resposta.data;
    },

    // edita motivo, data, horário e situação
    async atualizar(id: number, dados: DadosConsulta): Promise<RespostaConsultaSalva> {
        const resposta = await api.put(`/consultas/${id}`, dados);
        return resposta.data;
    },

    // remove só a consulta, o paciente continua cadastrado
    async remover(id: number): Promise<{ mensagem: string }> {
        const resposta = await api.delete(`/consultas/${id}`);
        return resposta.data;
    },

    // (temporário) ainda usado pelos indicadores do Perfil, sai na feature do Perfil
    async listar(): Promise<Consulta[]> {
        const resposta = await api.get("/consultas");
        return resposta.data;
    },
};