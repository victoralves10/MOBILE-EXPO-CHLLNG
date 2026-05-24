import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Modal,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import { styles } from "./styles";
import { colors } from "../../global/colors";
import CustomTextInput from "../../components/CustomTextInput/Index";
import ConsultaCard from "../../components/ConsultaCard/Index";
import { consultaController } from "../../controllers/consultaController";
import { pacienteController } from "../../controllers/pacienteController";
import { Consulta, StatusConsulta } from "../../models/Consulta";
import { Animal } from "../../models/Animal";

// tipagem que junta a consulta com os dados do animal dela
interface ConsultaComDados {
    consulta: Consulta;
    animal: Animal;
}

// opções de status disponíveis para criar/editar consulta
const STATUS_OPCOES: StatusConsulta[] = ["Agendado", "Concluido", "Atrasado"];

// tipo do filtro de status, pode ser "Todos" ou um dos status reais
type FiltroStatus = "Todos" | StatusConsulta;

// converte DD/MM/AAAA para AAAA-MM-DD (formato que o calendário usa)
function parsarData(dtStr: string): string {
    const partes = dtStr.split("/");
    if (partes.length !== 3) return "";
    return `${partes[2]}-${partes[1]}-${partes[0]}`;
}

// retorna a cor certa dependendo do status da consulta
function corDoStatus(status: string) {
    if (status === "Concluido") return colors.success;
    if (status === "Agendado") return colors.bluePrimary;
    if (status === "Atrasado") return colors.danger;
    return colors.gray;
}

export default function ConsultaTela() {
    const navigation = useNavigation<any>();

    // lista de consultas com os dados do animal
    const [consultas, setConsultas] = useState<ConsultaComDados[]>([]);

    // texto digitado na busca
    const [busca, setBusca] = useState("");

    // filtro de status selecionado
    const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("Todos");

    // data clicada no calendário (formato AAAA-MM-DD)
    const [dataSelecionada, setDataSelecionada] = useState<string | null>(null);

    // controla se o modal de filtro está aberto
    const [modalFiltroVisivel, setModalFiltroVisivel] = useState(false);

    // controla se o modal de nova consulta está aberto
    const [modalVisivel, setModalVisivel] = useState(false);

    // campos do formulário de nova consulta
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

    // toda vez que o usuário voltar pra essa tela, recarrega as consultas
    useFocusEffect(
        useCallback(() => {
            carregarConsultas();
        }, [])
    );

    async function carregarConsultas() {
        const todasConsultas = await consultaController.buscarTodas();
        const comDados: ConsultaComDados[] = [];

        // para cada consulta busca o animal vinculado
        for (const consulta of todasConsultas) {
            const animal = await pacienteController.buscarAnimalPorId(consulta.id_animal);
            if (animal) comDados.push({ consulta, animal });
        }

        setConsultas(comDados);
    }

    // zera todos os campos do formulário
    function limparCampos() {
        setHistorico(""); setDtConsulta(""); setHrConsulta(""); setStatus("Agendado");
        setNmAnimal(""); setEspecieAnimal(""); setRacaAnimal(""); setDtNascimento("");
        setPesoAnimal(""); setRgAnimal(""); setMicrochip("");
        setNmResponsavel(""); setCpfResponsavel(""); setTelefoneResponsavel("");
    }

    // limpa os filtros e fecha o modal de filtro
    function limparFiltros() {
        setDataSelecionada(null);
        setFiltroStatus("Todos");
        setModalFiltroVisivel(false);
    }

    async function handleSalvar() {
        if (!historico || !dtConsulta || !hrConsulta || !nmAnimal || !especieAnimal) {
            Alert.alert("Atenção", "Preencha os campos obrigatórios.");
            return;
        }

        if (!nmResponsavel || !cpfResponsavel || !telefoneResponsavel) {
            Alert.alert("Atenção", "Preencha os dados do responsável.");
            return;
        }

        try {
            await consultaController.criar(
                { historico_consulta: historico, dt_consulta: dtConsulta, hr_consulta: hrConsulta, st_consulta: status, id_animal: "", id_responsavel: "" },
                { cpf_responsavel: cpfResponsavel, nm_responsavel: nmResponsavel, nr_telefone_responsavel: telefoneResponsavel },
                { nm_animal: nmAnimal, especie_animal: especieAnimal, raca_animal: racaAnimal, dt_nascimento_animal: dtNascimento, peso_animal: pesoAnimal, rg_animal: rgAnimal, nr_microchip_animal: microchip }
            );

            setModalVisivel(false);
            limparCampos();
            carregarConsultas();
        } catch (error) {
            Alert.alert("Erro", "Não foi possível salvar a consulta.");
        }
    }

    // true se tiver algum filtro ativo
    const temFiltroAtivo = filtroStatus !== "Todos" || dataSelecionada !== null;

    // filtra a lista conforme busca, status e data selecionada
    const consultasFiltradas = consultas.filter(({ consulta, animal }) => {
        const buscaOk = animal.nm_animal.toLowerCase().includes(busca.toLowerCase());
        const statusOk = filtroStatus === "Todos" || consulta.st_consulta === filtroStatus;
        const dataOk = dataSelecionada
            ? parsarData(consulta.dt_consulta) === dataSelecionada
            : true;
        return buscaOk && statusOk && dataOk;
    });

    return (
        <View style={styles.container}>

            {/* barra de busca com ícone de filtro na direita */}
            <View style={styles.containerBusca}>
                <CustomTextInput
                    placeholder="Buscar consulta..."
                    leftIconName="search"
                    rightIconName="ellipsis-vertical"
                    rightIconType="button"
                    onRightIconPress={() => setModalFiltroVisivel(true)}
                    value={busca}
                    onChangeText={setBusca}
                    containerStyle={{ marginBottom: 0 }}
                    rightIconColor={temFiltroAtivo ? colors.bluePrimary : colors.gray}
                />

                {/* tags dos filtros ativos, clica pra remover cada um */}
                {temFiltroAtivo && (
                    <View style={styles.containerTagsFiltro}>
                        {filtroStatus !== "Todos" && (
                            <TouchableOpacity
                                style={[styles.tagFiltroAtivo, { backgroundColor: corDoStatus(filtroStatus) }]}
                                onPress={() => setFiltroStatus("Todos")}
                            >
                                <Text style={styles.textoTagFiltro}>{filtroStatus}</Text>
                                <Ionicons name="close" size={12} color={colors.white} />
                            </TouchableOpacity>
                        )}
                        {dataSelecionada && (
                            <TouchableOpacity
                                style={styles.tagFiltroAtivo}
                                onPress={() => setDataSelecionada(null)}
                            >
                                <Text style={styles.textoTagFiltro}>{dataSelecionada}</Text>
                                <Ionicons name="close" size={12} color={colors.white} />
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            </View>

            {/* lista de cards de consulta */}
            <View style={styles.containerLista}>
                <FlatList
                    data={consultasFiltradas}
                    keyExtractor={({ consulta }) => consulta.id_consulta}
                    renderItem={({ item }) => (
                        <ConsultaCard
                            consulta={item.consulta}
                            animal={item.animal}
                            onPress={() => navigation.navigate("DetalheConsulta", { id_consulta: item.consulta.id_consulta })}
                            onPressIcone={() => Alert.alert("Consulta Online", "Levando você para a consulta online.")}
                        />
                    )}
                    ListEmptyComponent={
                        <Text style={styles.textoVazio}>Nenhuma consulta encontrada.</Text>
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            </View>

            {/* botão "+" flutuante para criar nova consulta */}
            <TouchableOpacity style={styles.botaoAdicionar} onPress={() => setModalVisivel(true)}>
                <Ionicons name="add" size={32} color={colors.white} />
            </TouchableOpacity>

            {/* modal de filtro com calendário e seletor de status */}
            <Modal
                visible={modalFiltroVisivel}
                transparent
                animationType="slide"
                onRequestClose={() => setModalFiltroVisivel(false)}
            >
                {/* clicando fora do modal fecha ele */}
                <TouchableOpacity
                    style={styles.modalFundo}
                    activeOpacity={1}
                    onPress={() => setModalFiltroVisivel(false)}
                >
                    {/* área do conteúdo do modal */}
                    <TouchableOpacity activeOpacity={1} style={styles.modalContainer} onPress={() => {}}>
                        <ScrollView showsVerticalScrollIndicator={false}>

                            <Text style={styles.modalTitulo}>Filtrar Consultas</Text>

                            {/* calendário para filtrar por data */}
                            <Text style={styles.labelFiltro}>Data</Text>
                            <Calendar
                                onDayPress={(day: any) => {
                                    // clica na mesma data = remove o filtro
                                    setDataSelecionada(
                                        dataSelecionada === day.dateString ? null : day.dateString
                                    );
                                }}
                                markedDates={
                                    dataSelecionada
                                        ? { [dataSelecionada]: { selected: true, selectedColor: colors.bluePrimary } }
                                        : {}
                                }
                                theme={{
                                    todayTextColor: colors.danger,
                                    selectedDayBackgroundColor: colors.bluePrimary,
                                    arrowColor: colors.bluePrimary,
                                    textDayFontSize: 14,
                                    textMonthFontSize: 15,
                                    textMonthFontWeight: "700",
                                }}
                                style={styles.calendario}
                            />

                            {/* seletor de status */}
                            <Text style={[styles.labelFiltro, { marginTop: 16 }]}>Status</Text>
                            <View style={styles.containerOpcoes}>
                                {(["Todos", ...STATUS_OPCOES] as FiltroStatus[]).map(opcao => (
                                    <TouchableOpacity
                                        key={opcao}
                                        style={[
                                            styles.opcaoStatus,
                                            filtroStatus === opcao && {
                                                backgroundColor: corDoStatus(opcao),
                                                borderColor: corDoStatus(opcao),
                                            },
                                        ]}
                                        onPress={() => setFiltroStatus(opcao)}
                                    >
                                        <Text style={[
                                            styles.textoOpcaoStatus,
                                            filtroStatus === opcao && styles.textoOpcaoStatusAtiva,
                                        ]}>
                                            {opcao}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {/* limpar zera tudo, aplicar só fecha o modal */}
                            <View style={styles.containerBotoes}>
                                <TouchableOpacity style={styles.botaoCancelar} onPress={limparFiltros}>
                                    <Text style={styles.textoBotaoCancelar}>Limpar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.botaoSalvar} onPress={() => setModalFiltroVisivel(false)}>
                                    <Text style={styles.textoBotaoSalvar}>Aplicar</Text>
                                </TouchableOpacity>
                            </View>

                        </ScrollView>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>

            {/* modal de criar nova consulta */}
            <Modal visible={modalVisivel} animationType="slide" transparent>
                <KeyboardAvoidingView
                    style={styles.modalOverlay}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    <View style={styles.modalContainer}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={styles.modalTitulo}>Nova Consulta</Text>

                            {/* dados da consulta */}
                            <CustomTextInput title="Histórico / Motivo *" placeholder="Ex: Vacinação anual" value={historico} onChangeText={setHistorico} />
                            <CustomTextInput title="Data *" placeholder="DD/MM/AAAA" value={dtConsulta} onChangeText={setDtConsulta} />
                            <CustomTextInput title="Horário *" placeholder="HH:MM" value={hrConsulta} onChangeText={setHrConsulta} />

                            {/* seletor de status */}
                            <View style={styles.containerStatus}>
                                <Text style={styles.labelStatus}>Status</Text>
                                <View style={styles.containerOpcoes}>
                                    {STATUS_OPCOES.map(opcao => (
                                        <TouchableOpacity
                                            key={opcao}
                                            style={[styles.opcaoStatus, status === opcao && styles.opcaoStatusAtiva]}
                                            onPress={() => setStatus(opcao)}
                                        >
                                            <Text style={[styles.textoOpcaoStatus, status === opcao && styles.textoOpcaoStatusAtiva]}>
                                                {opcao}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {/* dados do animal */}
                            <CustomTextInput title="Nome do Animal *" placeholder="Ex: Rex" value={nmAnimal} onChangeText={setNmAnimal} />
                            <CustomTextInput title="Espécie *" placeholder="Ex: Cão, Gato" value={especieAnimal} onChangeText={setEspecieAnimal} />
                            <CustomTextInput title="Raça" placeholder="Ex: Labrador" value={racaAnimal} onChangeText={setRacaAnimal} />
                            <CustomTextInput title="Data de Nascimento" placeholder="DD/MM/AAAA" value={dtNascimento} onChangeText={setDtNascimento} />
                            <CustomTextInput title="Peso (kg)" placeholder="Ex: 12.5" value={pesoAnimal} onChangeText={setPesoAnimal} keyboardType="numeric" />
                            <CustomTextInput title="RG do Animal" placeholder="Ex: 123456" value={rgAnimal} onChangeText={setRgAnimal} />
                            <CustomTextInput title="Microchip" placeholder="Ex: 985112345678901" value={microchip} onChangeText={setMicrochip} keyboardType="numeric" />

                            {/* dados do responsável */}
                            <CustomTextInput title="Nome do Responsável *" placeholder="Ex: João Silva" value={nmResponsavel} onChangeText={setNmResponsavel} />
                            <CustomTextInput title="CPF do Responsável *" placeholder="Ex: 000.000.000-00" value={cpfResponsavel} onChangeText={setCpfResponsavel} keyboardType="numeric" />
                            <CustomTextInput title="Telefone do Responsável *" placeholder="Ex: (11) 99999-9999" value={telefoneResponsavel} onChangeText={setTelefoneResponsavel}/>

                            {/* cancelar zera os campos, salvar chama o handleSalvar */}
                            <View style={styles.containerBotoes}>
                                <TouchableOpacity style={styles.botaoCancelar} onPress={() => { setModalVisivel(false); limparCampos(); }}>
                                    <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvar}>
                                    <Text style={styles.textoBotaoSalvar}>Salvar</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </Modal>

        </View>
    );
}