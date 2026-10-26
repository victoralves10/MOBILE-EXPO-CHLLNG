import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { consultaController, DadosNovaConsulta, DadosNovoResponsavel, DadosNovoAnimal } from "../controllers/consultaController";
import { schemaNovaConsulta } from "../validations/consultaValidations";
import { StatusConsulta } from "../models/Consulta";
import { toastErro, toastSucesso } from "../utils/toast";

// (temporário) lógica do modal de nova consulta, só mudou de arquivo
// ela é refeita na próxima feature, usando o POST /consultas novo do backend
const OPCOES_STATUS: StatusConsulta[] = ["Agendado", "Atrasado", "Concluido"];

export function useNovaConsulta() {
    const queryClient = useQueryClient();

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
            setModalVisivel(false);
            limparCampos();
        },
        onError: () => toastErro("Não foi possível salvar a consulta."),
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
        OPCOES_STATUS,
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