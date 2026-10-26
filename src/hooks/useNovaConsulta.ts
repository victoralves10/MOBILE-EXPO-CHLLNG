import { useState } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { consultaService } from "../services/consultaService";
import { pacienteService } from "../services/pacienteService";
import { responsavelService } from "../services/responsavelService";
import { catalogoService } from "../services/catalogoService";
import { mensagemDeErro } from "../services/api";
import { useDebounce } from "./useDebounce";
import { NovaConsulta, StatusConsulta } from "../models/Consulta";
import { PacienteItem, ResponsavelItem } from "../models/Paciente";
import { toastAviso, toastErro, toastSucesso } from "../utils/toast";

export type Modo = "existente" | "novo";

// todos os campos digitados do formulário num objeto só
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
// o app só junta o que foi preenchido; quem valida e decide tudo é o backend
export function useNovaConsulta(aoSalvar: () => void) {
    const queryClient = useQueryClient();

    const [form, setForm] = useState<Formulario>(FORM_VAZIO);
    const [modoPaciente, setModoPaciente] = useState<Modo>("existente");
    const [modoResponsavel, setModoResponsavel] = useState<Modo>("existente");

    const [buscaPaciente, setBuscaPaciente] = useState("");
    const [pacienteEscolhido, setPacienteEscolhido] = useState<PacienteItem | null>(null);
    const [buscaResponsavel, setBuscaResponsavel] = useState("");
    const [responsavelEscolhido, setResponsavelEscolhido] = useState<ResponsavelItem | null>(null);

    // atalho pra atualizar um campo: mudar("nm_animal")("Rex")
    function mudar<C extends keyof Formulario>(campo: C) {
        return (valor: Formulario[C]) => setForm((atual) => ({ ...atual, [campo]: valor }));
    }

    // volta tudo pro começo
    function limpar() {
        setForm(FORM_VAZIO);
        setModoPaciente("existente");
        setModoResponsavel("existente");
        setBuscaPaciente("");
        setPacienteEscolhido(null);
        setBuscaResponsavel("");
        setResponsavelEscolhido(null);
    }

    // ---------- buscas (com debounce, quem filtra é o backend) ----------

    const buscaPacienteDebounced = useDebounce(buscaPaciente.trim(), 500);
    const buscaResponsavelDebounced = useDebounce(buscaResponsavel.trim(), 500);

    // só busca paciente depois que o usuário digitou algo (com muitos pacientes, não dá pra listar todos)
    const pacientesQuery = useQuery({
        queryKey: ["pacientes", buscaPacienteDebounced],
        queryFn: () => pacienteService.buscar(buscaPacienteDebounced),
        enabled: modoPaciente === "existente" && !pacienteEscolhido && buscaPacienteDebounced !== "",
    });

    // mesma ideia pro responsável: só busca depois que digitou algo
    const responsaveisQuery = useQuery({
        queryKey: ["responsaveis", buscaResponsavelDebounced],
        queryFn: () => responsavelService.buscar(buscaResponsavelDebounced),
        enabled:
            modoPaciente === "novo" &&
            modoResponsavel === "existente" &&
            !responsavelEscolhido &&
            buscaResponsavelDebounced !== "",
    });

    // lista de regiões do backend, carrega uma vez só
    const regioesQuery = useQuery({ queryKey: ["catalogo", "regioes"], queryFn: catalogoService.regioes, staleTime: Infinity });

    function escolherPaciente(id: number) {
        setPacienteEscolhido(pacientesQuery.data?.find((p) => p.id_animal === id) ?? null);
    }

    function escolherResponsavel(id: number) {
        setResponsavelEscolhido(responsaveisQuery.data?.find((r) => r.id_responsavel === id) ?? null);
    }

    // ---------- salvar ----------

    // monta o corpo de um dos 3 casos, igualzinho o backend espera
    function montarCorpo(): NovaConsulta {
        const consulta = {
            historico_consulta: form.historico_consulta,
            dt_consulta: form.dt_consulta,
            hr_consulta: form.hr_consulta,
            st_consulta: form.st_consulta,
            ds_doenca: null,
        };

        // caso 1: paciente já cadastrado
        if (modoPaciente === "existente") {
            return { consulta, paciente: { id_animal: pacienteEscolhido?.id_animal ?? null } };
        }

        // caso 2 (responsável cadastrado) ou caso 3 (responsável novo)
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
            queryClient.invalidateQueries({ queryKey: ["consultas"] });
            queryClient.invalidateQueries({ queryKey: ["pacientes"] });
            limpar();
            aoSalvar();
        },
        onError: (erro) => {
            // CPF já cadastrado: o backend manda o responsável que já existe, então já deixa ele escolhido
            const existente = axios.isAxiosError(erro) ? erro.response?.data?.responsavel_existente : null;
            if (existente) {
                setModoResponsavel("existente");
                setResponsavelEscolhido(existente);
                toastAviso("Esse CPF já está cadastrado. Já selecionamos o responsável pra você.");
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
        // com a busca vazia não mostra nada
        pacientes: buscaPacienteDebounced ? pacientesQuery.data ?? [] : [],
        // também conta como "buscando" enquanto espera o usuário parar de digitar
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