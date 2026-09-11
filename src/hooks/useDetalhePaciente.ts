import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { pacienteController } from "../controllers/pacienteController";
import { formatarData, converterParaIso } from "../utils/formatacao";
import { schemaEditarPaciente } from "../validations/pacienteValidations";
import { toastErro, toastSucesso } from "../utils/toast";

export function useDetalhePaciente() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const queryClient = useQueryClient();

    const { id_animal } = route.params;

    const fichaQuery = useQuery({
        queryKey: ["ficha-paciente", id_animal],
        queryFn: () => pacienteController.buscarFichaCompleta(id_animal),
    });

    const animal = fichaQuery.data?.animal ?? null;
    const responsavel = fichaQuery.data?.responsavel ?? null;
    const consultas = fichaQuery.data?.consultas ?? [];
    const carregando = fichaQuery.isLoading;

    const [modalVisivel, setModalVisivel] = useState(false);
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

    function abrirModalEditar() {
        if (!animal || !responsavel) return;
        setNmAnimal(animal.nm_animal);
        setEspecieAnimal(animal.especie_animal);
        setRacaAnimal(animal.raca_animal ?? "");
        // a data vem da API em ISO - mostra formatada em DD/MM/AAAA no campo
        setDtNascimento(animal.dt_nascimento_animal ? formatarData(animal.dt_nascimento_animal) : "");
        setPesoAnimal(animal.peso_animal != null ? String(animal.peso_animal) : "");
        setRgAnimal(animal.rg_animal ?? "");
        setMicrochip(animal.nr_microchip_animal ?? "");
        setNmResponsavel(responsavel.nm_responsavel);
        setCpfResponsavel(responsavel.cpf_responsavel);
        setTelefoneResponsavel(responsavel.nr_telefone_responsavel);
        setModalVisivel(true);
    }

    function fecharModalEditar() {
        setModalVisivel(false);
    }

    const mutationAtualizar = useMutation({
        mutationFn: async () => {
            await pacienteController.atualizarAnimal({
                ...animal!,
                nm_animal: nmAnimal,
                especie_animal: especieAnimal,
                raca_animal: racaAnimal || null,
                dt_nascimento_animal: dtNascimento ? converterParaIso(dtNascimento) : null,
                peso_animal: pesoAnimal ? Number(pesoAnimal) : null,
                rg_animal: rgAnimal || null,
                nr_microchip_animal: microchip || null,
            });

            await pacienteController.atualizarResponsavel({
                ...responsavel!,
                nm_responsavel: nmResponsavel,
                cpf_responsavel: cpfResponsavel,
                nr_telefone_responsavel: telefoneResponsavel,
            });
        },
        onSuccess: () => {
            toastSucesso("Paciente atualizado!");
            queryClient.invalidateQueries({ queryKey: ["ficha-paciente", id_animal] });
            queryClient.invalidateQueries({ queryKey: ["animais"] });
            queryClient.invalidateQueries({ queryKey: ["responsaveis"] });
            setModalVisivel(false);
        },
        onError: (error) => {
            console.error("[useDetalhePaciente.handleSalvar]", error);
            // fecha o modal, senão o toast de erro fica escondido atrás dele
            setModalVisivel(false);
            toastErro("Não foi possível salvar as alterações.");
        },
    });

    async function handleSalvar() {
        if (!animal || !responsavel) return;
        try {
            await schemaEditarPaciente.validate({ nmAnimal, especieAnimal, nmResponsavel, cpfResponsavel, telefoneResponsavel });
        } catch (erro: any) {
            toastErro(erro.message);
            return;
        }
        mutationAtualizar.mutate();
    }

    const mutationRemover = useMutation({
        mutationFn: () => pacienteController.removerPaciente(animal!.id_animal, responsavel!.id_responsavel),
        onSuccess: () => {
            toastSucesso("Paciente removido.");
            queryClient.invalidateQueries({ queryKey: ["animais"] });
            queryClient.invalidateQueries({ queryKey: ["responsaveis"] });
            navigation.goBack();
        },
        onError: (error) => {
            console.error("[useDetalhePaciente.remover]", error);
            toastErro("Não foi possível remover o paciente.");
        },
    });

    function abrirDetalheConsulta(id_consulta: number) {
        navigation.navigate("DetalheConsulta", { id_consulta });
    }

    return {
        animal,
        responsavel,
        consultas,
        carregando,
        abrirDetalheConsulta,

        modalVisivel,
        abrirModalEditar,
        fecharModalEditar,
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
        handleSalvar,
        salvando: mutationAtualizar.isPending,

        remover: mutationRemover.mutate,
        removendo: mutationRemover.isPending,
    };
}