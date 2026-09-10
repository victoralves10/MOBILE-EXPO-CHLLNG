import { consultaService } from "../services/consultaService";
import { animalService } from "../services/animalService";
import { responsavelService } from "../services/responsavelService";
import { converterParaIso } from "../utils/formatacao";
import { Consulta, StatusConsulta } from "../models/Consulta";

// dados soltos do formulário de "Nova Consulta" (ainda sem ids, porque
// animal/responsável podem já existir ou precisar ser criados agora)
interface DadosNovaConsulta {
    historico_consulta: string;
    dt_consulta: string; // DD/MM/AAAA, vindo do formulário
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
    dt_nascimento_animal: string; // DD/MM/AAAA, vindo do formulário
    peso_animal: string;
    rg_animal: string;
    nr_microchip_animal: string;
}

export const consultaController = {

    // retorna todas as consultas do usuário logado
    async buscarTodas(): Promise<Consulta[]> {
        return await consultaService.listar();
    },

    // busca uma consulta específica pelo id
    async buscarPorId(id_consulta: number): Promise<Consulta | null> {
        return await consultaService.buscarPorId(id_consulta);
    },

    // cria uma nova consulta junto com o animal e responsável (evita duplicar
    // responsável/animal já cadastrados, buscando por cpf/microchip na API)
    async criar(
        dados: DadosNovaConsulta,
        responsavel: DadosNovoResponsavel,
        animal: DadosNovoAnimal
    ): Promise<void> {

        // verifica se o responsável já existe pelo cpf, evita duplicado
        const responsavelExistente = await responsavelService.buscarPorCpf(responsavel.cpf_responsavel);

        let id_responsavel: number;

        if (responsavelExistente) {
            id_responsavel = responsavelExistente.id_responsavel;
        } else {
            const novoResponsavel = await responsavelService.criar(responsavel);
            id_responsavel = novoResponsavel.id_responsavel;
        }

        // verifica se o animal já existe pelo microchip, evita duplicado
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

        // por fim cria a consulta vinculada ao animal
        await consultaService.criar({
            historico_consulta: dados.historico_consulta,
            dt_consulta: converterParaIso(dados.dt_consulta),
            hr_consulta: dados.hr_consulta,
            st_consulta: dados.st_consulta,
            id_animal,
        });
    },

    // atualiza os dados de uma consulta existente
    async atualizar(consulta: Consulta): Promise<void> {
        await consultaService.atualizar(consulta);
    },

    // remove uma consulta pelo id
    async remover(id_consulta: number): Promise<void> {
        await consultaService.remover(id_consulta);
    },
};

export type { DadosNovaConsulta, DadosNovoResponsavel, DadosNovoAnimal };