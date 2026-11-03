import { useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { consultaService } from "../services/consultaService";
import { pacienteService } from "../services/pacienteService";
import { responsavelService } from "../services/responsavelService";
import { catalogoService } from "../services/catalogoService";
import { mensagemDeErro } from "../services/api";
import { reagendarConsulta } from "../services/notificacoes";
import { useDebounce } from "./useDebounce";
import { NovaConsulta, StatusConsulta } from "../models/Consulta";
import { PacienteItem, ResponsavelItem } from "../models/Paciente";
import { toastAviso, toastErro, toastSucesso } from "../utils/toast";

export type Modo = "existente" | "novo";

const FORM_VAZIO = {
    historico_consulta: "",
    dt_consulta: "",
    hr_consulta: "",
    st_consulta: "Agendado" as StatusConsulta,

    nm_animal: "",
    especie_animal: "",
    raca_animal: "",
    dt_nascimento_animal: "",
    peso_animal: "",
    rg_animal: "",
    nr_microchip_animal: "",

    nm_responsavel: "",
    cpf_responsavel: "",
    nr_telefone_responsavel: "",
    id_regiao: null as number | null,
};

type Formulario = typeof FORM_VAZIO;

// lógica do modal de nova consulta
export function useNovaConsulta(aoSalvar: () => void) {
    const queryClient = useQueryClient();

    const [form, setForm] = useState<Formulario>(FORM_VAZIO);
    const [modoPaciente, setModoPaciente] = useState<Modo>("existente");
    const [modoResponsavel, setModoResponsavel] = useState<Modo>("existente");

    const [buscaPaciente, setBuscaPaciente] = useState("");
    const [pacienteEscolhido, setPacienteEscolhido] = useState<PacienteItem | null>(null);
    const [buscaResponsavel, setBuscaResponsavel] = useState("");
    const [responsavelEscolhido, setResponsavelEscolhido] = useState<ResponsavelItem | null>(null);

    function mudar<C extends keyof Formulario>(campo: C) {
        return (valor: Formulario[C]) => setForm((atual) => ({ ...atual, [campo]: valor }));
    }

    function limpar() {
        setForm(FORM_VAZIO);
        setModoPaciente("existente");
        setModoResponsavel("existente");
        setBuscaPaciente("");
        setPacienteEscolhido(null);
        setBuscaResponsavel("");
        setResponsavelEscolhido(null);
    }

    // ---------- buscas ----------

    const buscaPacienteDebounced = useDebounce(buscaPaciente.trim());
    const buscaResponsavelDebounced = useDebounce(buscaResponsavel.trim());

    const pacientesQuery = useQuery({
        queryKey: ["pacientes", buscaPacienteDebounced],
        queryFn: () => pacienteService.buscar(buscaPacienteDebounced),
        enabled: modoPaciente === "existente" && !pacienteEscolhido && buscaPacienteDebounced !== "",
    });

    const responsaveisQuery = useQuery({
        queryKey: ["responsaveis", buscaResponsavelDebounced],
        queryFn: () => responsavelService.buscar(buscaResponsavelDebounced),
        enabled: modoPaciente === "novo" && modoResponsavel === "existente" && !responsavelEscolhido && buscaResponsavelDebounced !== "",
    });

    const regioesQuery = useQuery({ queryKey: ["catalogo", "regioes"], queryFn: catalogoService.regioes, staleTime: Infinity });

    function escolherPaciente(id: number) {
        setPacienteEscolhido(pacientesQuery.data?.find((p) => p.id_animal === id) ?? null);
    }

    function escolherResponsavel(id: number) {
        setResponsavelEscolhido(responsaveisQuery.data?.find((r) => r.id_responsavel === id) ?? null);
    }

    // ---------- salvar ----------

    // corpo de um dos 3 casos
    function montarCorpo(): NovaConsulta {
        const consulta = {
            historico_consulta: form.historico_consulta,
            dt_consulta: form.dt_consulta,
            hr_consulta: form.hr_consulta,
            st_consulta: form.st_consulta,
            ds_doenca: null,
        };

        // caso 1: paciente cadastrado
        if (modoPaciente === "existente") {
            return { consulta, paciente: { id_animal: pacienteEscolhido?.id_animal ?? null } };
        }

        // caso 2: responsável cadastrado / caso 3: responsável novo
        const responsavel =
            modoResponsavel === "existente"
                ? { id_responsavel: responsavelEscolhido?.id_responsavel ?? null }
                : {
                      novo: {
                          nm_responsavel: form.nm_responsavel,
                          cpf_responsavel: form.cpf_responsavel,
                          nr_telefone_responsavel: form.nr_telefone_responsavel,
                          id_regiao: form.id_regiao,
                      },
                  };

        return {
            consulta,
            paciente: {
                novo: {
                    nm_animal: form.nm_animal,
                    especie_animal: form.especie_animal,
                    raca_animal: form.raca_animal,
                    dt_nascimento_animal: form.dt_nascimento_animal,
                    peso_animal: form.peso_animal,
                    rg_animal: form.rg_animal,
                    nr_microchip_animal: form.nr_microchip_animal,
                    responsavel,
                },
            },
        };
    }

    const mutationCriar = useMutation({
        mutationFn: () => consultaService.criar(montarCorpo()),
        onSuccess: (resposta) => {
            toastSucesso(resposta.mensagem);
            reagendarConsulta(resposta.consulta.id_consulta, resposta.lembretes);
            queryClient.invalidateQueries({ queryKey: ["consultas"] });
            queryClient.invalidateQueries({ queryKey: ["pacientes"] });
            limpar();
            aoSalvar();
        },
        onError: (erro) => {
            // CPF já cadastrado
            const existente = axios.isAxiosError(erro) ? erro.response?.data?.responsavel_existente : null;
            if (existente) {
                setModoResponsavel("existente");
                setResponsavelEscolhido(existente);
                toastAviso(mensagemDeErro(erro));
                return;
            }
            toastErro(mensagemDeErro(erro));
        },
    });

    return {
        form,
        mudar,
        limpar,

        modoPaciente,
        setModoPaciente,
        modoResponsavel,
        setModoResponsavel,

        buscaPaciente,
        setBuscaPaciente,
        pacientes: buscaPacienteDebounced ? pacientesQuery.data ?? [] : [],
        buscandoPacientes: pacientesQuery.isFetching || buscaPaciente.trim() !== buscaPacienteDebounced,
        pacienteEscolhido,
        escolherPaciente,
        trocarPaciente: () => setPacienteEscolhido(null),

        buscaResponsavel,
        setBuscaResponsavel,
        responsaveis: buscaResponsavelDebounced ? responsaveisQuery.data ?? [] : [],
        buscandoResponsaveis: responsaveisQuery.isFetching || buscaResponsavel.trim() !== buscaResponsavelDebounced,
        responsavelEscolhido,
        escolherResponsavel,
        trocarResponsavel: () => setResponsavelEscolhido(null),

        regioes: regioesQuery.data ?? [],

        salvar: () => mutationCriar.mutate(),
        salvando: mutationCriar.isPending,
    };
}
