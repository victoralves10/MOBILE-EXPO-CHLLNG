import AsyncStorage from "@react-native-async-storage/async-storage";

// chave que marca se o seed já foi executado, evita duplicar os dados
const KEY_SEED = "@clyvovet:seed_executado";

// chaves dos dados
const KEY_RESPONSAVEIS = "@clyvovet:responsaveis";
const KEY_ANIMAIS = "@clyvovet:animais";
const KEY_CONSULTAS = "@clyvovet:consultas";

export async function executarSeedSeNecessario(): Promise<void> {

    // se já executou antes, para aqui, não repete os dados
    const jaExecutou = await AsyncStorage.getItem(KEY_SEED);
    if (jaExecutou) return;

    // dados mockados dos responsáveis
    const responsaveis = [
        { id_responsavel: "r1", cpf_responsavel: "111.111.111-11", nm_responsavel: "Carlos Oliveira", nr_telefone_responsavel: "(11) 99999-1111" },
        { id_responsavel: "r2", cpf_responsavel: "222.222.222-22", nm_responsavel: "Ana Paula Silva", nr_telefone_responsavel: "(11) 99999-2222" },
        { id_responsavel: "r3", cpf_responsavel: "333.333.333-33", nm_responsavel: "Marcos Souza", nr_telefone_responsavel: "(11) 99999-3333" },
        { id_responsavel: "r4", cpf_responsavel: "444.444.444-44", nm_responsavel: "Juliana Costa", nr_telefone_responsavel: "(11) 99999-4444" },
        { id_responsavel: "r5", cpf_responsavel: "555.555.555-55", nm_responsavel: "Roberto Lima", nr_telefone_responsavel: "(11) 99999-5555" },
        { id_responsavel: "r6", cpf_responsavel: "666.666.666-66", nm_responsavel: "Fernanda Rocha", nr_telefone_responsavel: "(11) 99999-6666" },
        { id_responsavel: "r7", cpf_responsavel: "777.777.777-77", nm_responsavel: "Pedro Alves", nr_telefone_responsavel: "(11) 99999-7777" },
    ];

    // dados mockados dos animais, cada um vinculado ao seu responsável
    const animais = [
        { id_animal: "a1", id_responsavel: "r1", nm_animal: "Thor", especie_animal: "Cão", raca_animal: "Labrador", dt_nascimento_animal: "10/03/2019", peso_animal: "28", rg_animal: "RG001", nr_microchip_animal: "985100001" },
        { id_animal: "a2", id_responsavel: "r2", nm_animal: "Luna", especie_animal: "Gato", raca_animal: "Siamês", dt_nascimento_animal: "22/07/2020", peso_animal: "4", rg_animal: "RG002", nr_microchip_animal: "985100002" },
        { id_animal: "a3", id_responsavel: "r3", nm_animal: "Bob", especie_animal: "Cão", raca_animal: "Bulldog", dt_nascimento_animal: "05/01/2018", peso_animal: "22", rg_animal: "RG003", nr_microchip_animal: "985100003" },
        { id_animal: "a4", id_responsavel: "r4", nm_animal: "Mia", especie_animal: "Gato", raca_animal: "Persa", dt_nascimento_animal: "14/11/2021", peso_animal: "3.5", rg_animal: "RG004", nr_microchip_animal: "985100004" },
        { id_animal: "a5", id_responsavel: "r5", nm_animal: "Rex", especie_animal: "Cão", raca_animal: "Pastor Alemão", dt_nascimento_animal: "30/06/2017", peso_animal: "35", rg_animal: "RG005", nr_microchip_animal: "985100005" },
        { id_animal: "a6", id_responsavel: "r6", nm_animal: "Mel", especie_animal: "Cão", raca_animal: "Golden Retriever", dt_nascimento_animal: "18/02/2020", peso_animal: "30", rg_animal: "RG006", nr_microchip_animal: "985100006" },
        { id_animal: "a7", id_responsavel: "r7", nm_animal: "Nina", especie_animal: "Gato", raca_animal: "Maine Coon", dt_nascimento_animal: "25/09/2019", peso_animal: "6", rg_animal: "RG007", nr_microchip_animal: "985100007" },
    ];

    // dados mockados das consultas, misturando os 3 status pra parecer real
    const consultas = [
        { id_consulta: "c1", id_animal: "a1", id_responsavel: "r1", historico_consulta: "Vacinação anual V10", st_consulta: "Concluido", dt_consulta: "10/01/2025", hr_consulta: "09:00" },
        { id_consulta: "c2", id_animal: "a1", id_responsavel: "r1", historico_consulta: "Retorno pós-cirurgia", st_consulta: "Concluido", dt_consulta: "25/01/2025", hr_consulta: "10:30" },
        { id_consulta: "c3", id_animal: "a2", id_responsavel: "r2", historico_consulta: "Check-up geral", st_consulta: "Concluido", dt_consulta: "05/02/2025", hr_consulta: "11:00" },
        { id_consulta: "c4", id_animal: "a2", id_responsavel: "r2", historico_consulta: "Vermifugação", st_consulta: "Atrasado", dt_consulta: "20/02/2025", hr_consulta: "14:00" },
        { id_consulta: "c5", id_animal: "a3", id_responsavel: "r3", historico_consulta: "Consulta dermatológica", st_consulta: "Concluido", dt_consulta: "08/02/2025", hr_consulta: "08:30" },
        { id_consulta: "c6", id_animal: "a3", id_responsavel: "r3", historico_consulta: "Limpeza dentária", st_consulta: "Atrasado", dt_consulta: "15/03/2025", hr_consulta: "09:00" },
        { id_consulta: "c7", id_animal: "a4", id_responsavel: "r4", historico_consulta: "Vacinação antirrábica", st_consulta: "Concluido", dt_consulta: "12/02/2025", hr_consulta: "15:00" },
        { id_consulta: "c8", id_animal: "a4", id_responsavel: "r4", historico_consulta: "Castração", st_consulta: "Concluido", dt_consulta: "28/02/2025", hr_consulta: "07:30" },
        { id_consulta: "c9", id_animal: "a5", id_responsavel: "r5", historico_consulta: "Exame de sangue", st_consulta: "Atrasado", dt_consulta: "01/03/2025", hr_consulta: "10:00" },
        { id_consulta: "c10", id_animal: "a5", id_responsavel: "r5", historico_consulta: "Controle de pulgas e carrapatos", st_consulta: "Concluido", dt_consulta: "18/03/2025", hr_consulta: "11:30" },
        { id_consulta: "c11", id_animal: "a6", id_responsavel: "r6", historico_consulta: "Vacinação V8", st_consulta: "Concluido", dt_consulta: "22/03/2025", hr_consulta: "09:30" },
        { id_consulta: "c12", id_animal: "a6", id_responsavel: "r6", historico_consulta: "Acompanhamento nutricional", st_consulta: "Atrasado", dt_consulta: "05/04/2025", hr_consulta: "14:30" },
        { id_consulta: "c13", id_animal: "a7", id_responsavel: "r7", historico_consulta: "Check-up geral", st_consulta: "Concluido", dt_consulta: "10/04/2025", hr_consulta: "08:00" },
        { id_consulta: "c14", id_animal: "a7", id_responsavel: "r7", historico_consulta: "Vermifugação semestral", st_consulta: "Concluido", dt_consulta: "25/04/2025", hr_consulta: "10:00" },
        { id_consulta: "c15", id_animal: "a1", id_responsavel: "r1", historico_consulta: "Reforço vacinal", st_consulta: "Agendado", dt_consulta: "20/05/2025", hr_consulta: "09:00" },
        { id_consulta: "c16", id_animal: "a2", id_responsavel: "r2", historico_consulta: "Consulta oftalmológica", st_consulta: "Agendado", dt_consulta: "22/05/2025", hr_consulta: "11:00" },
        { id_consulta: "c17", id_animal: "a3", id_responsavel: "r3", historico_consulta: "Retorno dermatológico", st_consulta: "Agendado", dt_consulta: "24/05/2025", hr_consulta: "14:00" },
        { id_consulta: "c18", id_animal: "a5", id_responsavel: "r5", historico_consulta: "Exame cardiológico", st_consulta: "Agendado", dt_consulta: "26/05/2025", hr_consulta: "08:30" },
        { id_consulta: "c19", id_animal: "a6", id_responsavel: "r6", historico_consulta: "Vacinação anual V10", st_consulta: "Agendado", dt_consulta: "28/05/2025", hr_consulta: "10:30" },
        { id_consulta: "c20", id_animal: "a4", id_responsavel: "r4", historico_consulta: "Retorno pós-castração", st_consulta: "Agendado", dt_consulta: "30/05/2025", hr_consulta: "15:00" },
    ];

    // salva tudo no asyncstorage de uma vez
    await AsyncStorage.setItem(KEY_RESPONSAVEIS, JSON.stringify(responsaveis));
    await AsyncStorage.setItem(KEY_ANIMAIS, JSON.stringify(animais));
    await AsyncStorage.setItem(KEY_CONSULTAS, JSON.stringify(consultas));

    // marca que o seed já foi executado
    await AsyncStorage.setItem(KEY_SEED, "true");
}