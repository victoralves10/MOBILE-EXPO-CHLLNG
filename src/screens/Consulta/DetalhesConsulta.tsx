import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Alert,
    Modal,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../global/colors";
import { consultaController } from "../../controllers/consultaController";
import { pacienteController } from "../../controllers/pacienteController";
import { Consulta, StatusConsulta } from "../../models/Consulta";
import { Animal } from "../../models/Animal";
import { Responsavel } from "../../models/Responsavel";
import CustomTextInput from "../../components/CustomTextInput/Index";
import { styles } from "./styles";

// opções de status que aparecem no modal de edição
const STATUS_OPCOES: StatusConsulta[] = ["Agendado", "Concluido", "Atrasado"];

// retorna a cor de fundo e do texto dependendo do status da consulta
function getStatusEstilo(status: string) {
    switch (status) {
        case "Concluido":
            return { bg: colors.success + "20", texto: colors.success };
        case "Atrasado":
            return { bg: colors.danger + "20", texto: colors.danger };
        default:
            return { bg: colors.bluePrimary + "20", texto: colors.bluePrimary };
    }
}

export default function DetalheConsulta() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();

    // pega o id que foi passado ao navegar pra essa tela
    const { id_consulta } = route.params;

    const [consulta, setConsulta] = useState<Consulta | null>(null);
    const [animal, setAnimal] = useState<Animal | null>(null);
    const [responsavel, setResponsavel] = useState<Responsavel | null>(null);

    // controla se o modal de edição está aberto
    const [modalVisivel, setModalVisivel] = useState(false);

    // campos do formulário de edição
    const [historico, setHistorico] = useState("");
    const [dtConsulta, setDtConsulta] = useState("");
    const [hrConsulta, setHrConsulta] = useState("");
    const [status, setStatus] = useState<StatusConsulta>("Agendado");

    // carrega os dados quando a tela abre
    useEffect(() => {
        carregarDados();
    }, []);

    async function carregarDados() {

        // busca a consulta pelo id
        const c = await consultaController.buscarPorId(id_consulta);
        if (!c) return;

        // busca o animal e o responsável vinculados a essa consulta
        const a = await pacienteController.buscarAnimalPorId(c.id_animal);
        const r = await pacienteController.buscarResponsavelPorId(c.id_responsavel);

        setConsulta(c);
        setAnimal(a);
        setResponsavel(r);
    }

    // preenche os campos do modal com os dados atuais antes de abrir
    function abrirModalEditar() {
        if (!consulta) return;
        setHistorico(consulta.historico_consulta);
        setDtConsulta(consulta.dt_consulta);
        setHrConsulta(consulta.hr_consulta);
        setStatus(consulta.st_consulta);
        setModalVisivel(true);
    }

    async function handleSalvar() {
        if (!consulta) return;

        if (!historico || !dtConsulta || !hrConsulta) {
            Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
            return;
        }

        // salva as alterações mantendo os outros dados intactos com o spread
        await consultaController.atualizar({
            ...consulta,
            historico_consulta: historico,
            dt_consulta: dtConsulta,
            hr_consulta: hrConsulta,
            st_consulta: status,
        });

        setModalVisivel(false);

        // recarrega os dados na tela depois de salvar
        carregarDados();
    }

    async function handleRemover() {
        Alert.alert(
            "Remover Consulta",
            "Deseja realmente remover esta consulta?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Remover",
                    style: "destructive",
                    onPress: async () => {
                        await consultaController.remover(id_consulta);

                        // volta pra tela anterior depois de remover
                        navigation.goBack();
                    },
                },
            ]
        );
    }

    // enquanto os dados não chegaram, mostra "Carregando..."
    if (!consulta || !animal || !responsavel) {
        return (
            <View style={styles.containerVazio}>
                <Text style={styles.textoVazio}>Carregando...</Text>
            </View>
        );
    }

    const statusEstilo = getStatusEstilo(consulta.st_consulta);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>

                {/* badge colorido do status no topo */}
                <View style={[styles.tagStatus, { backgroundColor: statusEstilo.bg }]}>
                    <Text style={[styles.textoStatus, { color: statusEstilo.texto }]}>
                        {consulta.st_consulta}
                    </Text>
                </View>

                {/* seção com os dados da consulta */}
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Consulta</Text>
                    <View style={styles.linha}>
                        <Ionicons name="document-text-outline" size={18} color={colors.bluePrimary} />
                        <Text style={styles.textoLinha}>{consulta.historico_consulta}</Text>
                    </View>
                    <View style={styles.linha}>
                        <Ionicons name="calendar-outline" size={18} color={colors.bluePrimary} />
                        <Text style={styles.textoLinha}>{consulta.dt_consulta}</Text>
                    </View>
                    <View style={styles.linha}>
                        <Ionicons name="time-outline" size={18} color={colors.bluePrimary} />
                        <Text style={styles.textoLinha}>{consulta.hr_consulta}</Text>
                    </View>

                    {/* botão de consulta online */}
                    <TouchableOpacity
                        style={styles.botaoOnline}
                        onPress={() => Alert.alert("Consulta Online", "Levando você para a consulta online.")}
                    >
                        <Ionicons name="videocam-outline" size={18} color={colors.white} />
                        <Text style={styles.textoBotaoOnline}>Iniciar Consulta Online</Text>
                    </TouchableOpacity>
                </View>

                {/* seção com os dados do animal */}
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Animal</Text>
                    <View style={styles.linha}>
                        <Ionicons name="paw-outline" size={18} color={colors.bluePrimary} />
                        <Text style={styles.textoLinha}>{animal.nm_animal}</Text>
                    </View>
                    <View style={styles.linha}>
                        <Ionicons name="leaf-outline" size={18} color={colors.bluePrimary} />
                        <Text style={styles.textoLinha}>{animal.especie_animal} • {animal.raca_animal}</Text>
                    </View>
                    <View style={styles.linha}>
                        <Ionicons name="calendar-outline" size={18} color={colors.bluePrimary} />
                        <Text style={styles.textoLinha}>Nascimento: {animal.dt_nascimento_animal}</Text>
                    </View>
                    <View style={styles.linha}>
                        <Ionicons name="fitness-outline" size={18} color={colors.bluePrimary} />
                        <Text style={styles.textoLinha}>Peso: {animal.peso_animal} kg</Text>
                    </View>
                    <View style={styles.linha}>
                        <Ionicons name="card-outline" size={18} color={colors.bluePrimary} />
                        <Text style={styles.textoLinha}>RG: {animal.rg_animal}</Text>
                    </View>
                    <View style={styles.linha}>
                        <Ionicons name="wifi-outline" size={18} color={colors.bluePrimary} />
                        <Text style={styles.textoLinha}>Microchip: {animal.nr_microchip_animal}</Text>
                    </View>
                </View>

                {/* seção com os dados do responsável */}
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Responsável</Text>
                    <View style={styles.linha}>
                        <Ionicons name="person-outline" size={18} color={colors.bluePrimary} />
                        <Text style={styles.textoLinha}>{responsavel.nm_responsavel}</Text>
                    </View>
                    <View style={styles.linha}>
                        <Ionicons name="id-card-outline" size={18} color={colors.bluePrimary} />
                        <Text style={styles.textoLinha}>CPF: {responsavel.cpf_responsavel}</Text>
                    </View>
                    <View style={styles.linha}>
                        <Ionicons name="call-outline" size={18} color={colors.bluePrimary} />
                        <Text style={styles.textoLinha}>{responsavel.nr_telefone_responsavel}</Text>
                    </View>
                </View>

                {/* botões de editar e remover no final da tela */}
                <View style={styles.containerBotoes}>
                    <TouchableOpacity style={styles.botaoEditar} onPress={abrirModalEditar}>
                        <Ionicons name="pencil-outline" size={18} color={colors.white} />
                        <Text style={styles.textoBotao}>Editar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botaoRemover} onPress={handleRemover}>
                        <Ionicons name="trash-outline" size={18} color={colors.white} />
                        <Text style={styles.textoBotao}>Remover</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>

            {/* modal de edição da consulta */}
            <Modal visible={modalVisivel} animationType="slide" transparent>
                <KeyboardAvoidingView
                    style={styles.modalOverlay}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    <View style={styles.modalContainer}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={styles.modalTitulo}>Editar Consulta</Text>

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

                            {/* cancelar fecha o modal, salvar chama o handleSalvar */}
                            <View style={styles.containerBotoesModal}>
                                <TouchableOpacity style={styles.botaoCancelar} onPress={() => setModalVisivel(false)}>
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