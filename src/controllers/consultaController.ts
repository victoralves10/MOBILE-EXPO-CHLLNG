import { consultaService } from "../services/consultaService";
import { animalService } from "../services/animalService";
import { responsavelService } from "../services/responsavelService";
import { converterParaIso } from "../utils/formatacao";
import { Consulta, StatusConsulta } from "../models/Consulta";

interface DadosNovaConsulta {
    historico_consulta: string;
    dt_consulta: string;
    hr_consulta: string;
    st_consulta: StatusConsulta;
}

interface DadosNovoResponsavel {
    cpf_responsavel: string;
    nm_responsavel: string;
    nr_telefone_responsavel: string;
}

interface DadosNovoAnimal {
    nm_animal: string;
    especie_animal: string;
    raca_animal: string;
    dt_nascimento_animal: string;
    peso_animal: string;
    rg_animal: string;
    nr_microchip_animal: string;
}

export const consultaController = {

    async buscarTodas(): Promise<Consulta[]> {
        return await consultaService.listar();
    },

    async buscarPorId(id_consulta: number): Promise<Consulta | null> {
        return await consultaService.buscarPorId(id_consulta);
    },

    async criar(
        dados: DadosNovaConsulta,
        responsavel: DadosNovoResponsavel,
        animal: DadosNovoAnimal
    ): Promise<void> {
        try {
            const responsavelExistente = await responsavelService.buscarPorCpf(responsavel.cpf_responsavel);

            let id_responsavel: number;
            if (responsavelExistente) {
                id_responsavel = responsavelExistente.id_responsavel;
            } else {
                const novoResponsavel = await responsavelService.criar(responsavel);
                id_responsavel = novoResponsavel.id_responsavel;
            }

            const animalExistente = animal.nr_microchip_animal
                ? await animalService.buscarPorMicrochip(animal.nr_microchip_animal)
                : null;

            let id_animal: number;
            if (animalExistente) {
                id_animal = animalExistente.id_animal;
            } else {
                const novoAnimal = await animalService.criar({
                    nm_animal: animal.nm_animal,
                    especie_animal: animal.especie_animal,
                    raca_animal: animal.raca_animal || null,
                    dt_nascimento_animal: animal.dt_nascimento_animal ? converterParaIso(animal.dt_nascimento_animal) : null,
                    peso_animal: animal.peso_animal ? Number(animal.peso_animal) : null,
                    rg_animal: animal.rg_animal || null,
                    nr_microchip_animal: animal.nr_microchip_animal || null,
                    id_responsavel,
                });
                id_animal = novoAnimal.id_animal;
            }

            await consultaService.criar({
                historico_consulta: dados.historico_consulta,
                dt_consulta: converterParaIso(dados.dt_consulta),
                hr_consulta: dados.hr_consulta,
                st_consulta: dados.st_consulta,
                id_animal,
            });
        } catch (error) {
            console.error("[consultaController.criar]", error);
            throw error;
        }
    },

    async atualizar(consulta: Consulta): Promise<void> {
        try {
            await consultaService.atualizar(consulta);
        } catch (error) {
            console.error("[consultaController.atualizar]", error);
            throw error;
        }
    },

    async remover(id_consulta: number): Promise<void> {
        try {
            await consultaService.remover(id_consulta);
        } catch (error) {
            console.error("[consultaController.remover]", error);
            throw error;
        }
    },
};

export type { DadosNovaConsulta, DadosNovoResponsavel, DadosNovoAnimal };
