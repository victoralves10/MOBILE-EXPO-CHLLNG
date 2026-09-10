import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { consultaService } from "../services/consultaService";
import { animalService } from "../services/animalService";
import { Consulta } from "../models/Consulta";
import { Animal } from "../models/Animal";

export interface ConsultaComAnimal {
    consulta: Consulta;
    animal: Animal;
}

export function useHome() {
    const navigation = useNavigation<any>();

    const consultasQuery = useQuery({
        queryKey: ["consultas"],
        queryFn: () => consultaService.listar(),
    });

    const animaisQuery = useQuery({
        queryKey: ["animais"],
        queryFn: () => animalService.listar(),
    });

    const carregando = consultasQuery.isLoading || animaisQuery.isLoading;

    const consultas = consultasQuery.data ?? [];
    const animais = animaisQuery.data ?? [];

    // só as agendadas, cada uma já combinada com os dados do animal dela
    const agendadasComAnimal: ConsultaComAnimal[] = consultas
        .filter((c) => c.st_consulta === "Agendado")
        .map((consulta) => {
            const animal = animais.find((a) => a.id_animal === consulta.id_animal);
            return animal ? { consulta, animal } : null;
        })
        .filter((item): item is ConsultaComAnimal => item !== null);

    function abrirDetalheConsulta(idConsulta: number) {
        navigation.navigate("DetalheConsulta", { id_consulta: idConsulta });
    }

    return {
        agendadasComAnimal,
        carregando,
        abrirDetalheConsulta,
    };
}