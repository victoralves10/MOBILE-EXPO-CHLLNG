import { useState, useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { consultaService } from "../services/consultaService";
import { animalService } from "../services/animalService";
import { consultaController, DadosNovaConsulta, DadosNovoResponsavel, DadosNovoAnimal } from "../controllers/consultaController";
import { schemaNovaConsulta } from "../validations/consultaValidations";
import { Consulta, StatusConsulta } from "../models/Consulta";
import { Animal } from "../models/Animal";
import { toastErro, toastSucesso } from "../utils/toast";

interface ConsultaComAnimal {
    consulta: Consulta;
    animal: Animal;
}

const FILTROS_STATUS: StatusConsulta[] = ["Agendado", "Atrasado", "Concluido"];

export function useConsultas() {
    const navigation = useNavigation<any>();
    const queryClient = useQueryClient();

    const [busca, setBusca] = useState("");
    const [filtroStatus, setFiltroStatus] = useState<StatusConsulta>("Agendado");

    const consultasQuery = useQuery({
        queryKey: ["consultas"],
        queryFn: () => consultaService.listar(),
    });

    const animaisQuery = useQuery({
        queryKey: ["animais"],
        queryFn: () => animalService.listar(),
    });

    useFocusEffect(
        useCallback(() => {
            consultasQuery.refetch();
            animaisQuery.refetch();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])
    );

    const carregando = consultasQuery.isLoading || animaisQuery.isLoading;
    const consultas = consultasQuery.data ?? [];
    const animais = animaisQuery.data ?? [];

    const consultasComAnimal: ConsultaComAnimal[] = consultas
        .map((consulta) => {
            const animal = animais.find((a) => a.id_animal === consulta.id_animal);
            return animal ? { consulta, animal } : null;
        })
        .filter((item): item is ConsultaComAnimal => item !== null);

    const consultasFiltradas = consultasComAnimal.filter(({ consulta, animal }) => {
        const statusOk = consulta.st_consulta === filtroStatus;
        const buscaOk = animal.nm_animal.toLowerCase().includes(busca.toLowerCase());
        return statusOk && buscaOk;
    });

    function abrirDetalheConsulta(id_consulta: number) {
        navigation.navigate("DetalheConsulta", { id_consulta });
    }

    // ---------- nova consulta ----------

    const [modalVisivel, setModalVisivel] = useState(false);

    const [historico, setHistorico] = useState("");
    const [dtConsulta, setDtConsulta] = useState("");
    const [hrConsulta, setHrConsulta] = useState("");
    const [status, setStatus] = useState<StatusConsulta>("Agendado");
    const [nmAnimal, setNmAnimal] = useState("");
    const [especieAnimal, setEspecieAnimal] = useState("");
    const [racaAnimal, setRacaAnimal] = useState("");
    const [dtNascimento, setDtNascimento] = useState("");
    const [pesoAnimal, setPesoAnimal] = useState("");
    const [rgAnimal, setRgAnimal] = useState("");
    const [microchip, setMicrochip] = useState("");
    const [nmResponsavel, setNmResponsavel] = useState("");
    const [cpfResponsavel, setCpfResponsavel] = useState("");
    const [telefoneResponsavel, setTelefoneResponsavel] = useState("");

    function limparCampos() {
        setHistorico(""); setDtConsulta(""); setHrConsulta(""); setStatus("Agendado");
        setNmAnimal(""); setEspecieAnimal(""); setRacaAnimal(""); setDtNascimento("");
        setPesoAnimal(""); setRgAnimal(""); setMicrochip("");
        setNmResponsavel(""); setCpfResponsavel(""); setTelefoneResponsavel("");
    }

    function abrirModalNovaConsulta() {
        limparCampos();
        setModalVisivel(true);
    }

    function fecharModalNovaConsulta() {
        setModalVisivel(false);
    }

    const mutationCriar = useMutation({
        mutationFn: ({
            dados,
            responsavel,
            animal,
        }: {
            dados: DadosNovaConsulta;
            responsavel: DadosNovoResponsavel;
            animal: DadosNovoAnimal;
        }) => consultaController.criar(dados, responsavel, animal),
        onSuccess: () => {
            toastSucesso("Consulta criada!");
            queryClient.invalidateQueries({ queryKey: ["consultas"] });
            queryClient.invalidateQueries({ queryKey: ["animais"] });
            setModalVisivel(false);
            limparCampos();
        },
        onError: (error) => {
            console.error("[useConsultas.handleSalvar]", error);
            toastErro("Não foi possível salvar a consulta.");
        },
    });

    async function handleSalvar() {
        try {
            await schemaNovaConsulta.validate(
                { historico, dtConsulta, hrConsulta, nmAnimal, especieAnimal, nmResponsavel, cpfResponsavel, telefoneResponsavel },
                { abortEarly: true }
            );
        } catch (erro: any) {
            toastErro(erro.message);
            return;
        }

        mutationCriar.mutate({
            dados: { historico_consulta: historico, dt_consulta: dtConsulta, hr_consulta: hrConsulta, st_consulta: status },
            responsavel: { cpf_responsavel: cpfResponsavel, nm_responsavel: nmResponsavel, nr_telefone_responsavel: telefoneResponsavel },
            animal: { nm_animal: nmAnimal, especie_animal: especieAnimal, raca_animal: racaAnimal, dt_nascimento_animal: dtNascimento, peso_animal: pesoAnimal, rg_animal: rgAnimal, nr_microchip_animal: microchip },
        });
    }

    return {
        busca,
        setBusca,
        filtroStatus,
        setFiltroStatus,
        FILTROS_STATUS,
        carregando,
        consultasFiltradas,
        abrirDetalheConsulta,

        modalVisivel,
        abrirModalNovaConsulta,
        fecharModalNovaConsulta,
        salvandoConsulta: mutationCriar.isPending,
        handleSalvar,

        historico, setHistorico,
        dtConsulta, setDtConsulta,
        hrConsulta, setHrConsulta,
        status, setStatus,
        nmAnimal, setNmAnimal,
        especieAnimal, setEspecieAnimal,
        racaAnimal, setRacaAnimal,
        dtNascimento, setDtNascimento,
        pesoAnimal, setPesoAnimal,
        rgAnimal, setRgAnimal,
        microchip, setMicrochip,
        nmResponsavel, setNmResponsavel,
        cpfResponsavel, setCpfResponsavel,
        telefoneResponsavel, setTelefoneResponsavel,
    };
}

export type { ConsultaComAnimal };
