import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ScrollView,
    Alert,
    TouchableOpacity,
    Modal,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../global/colors";
import { pacienteController } from "../../controllers/pacienteController";
import { Animal } from "../../models/Animal";
import { Responsavel } from "../../models/Responsavel";
import { Consulta } from "../../models/Consulta";
import CustomTextInput from "../../components/CustomTextInput/Index";
import { styles } from "./styles";

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

export default function DetalhePaciente() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();

    // pega o id que foi passado ao navegar pra essa tela
    const { id_animal } = route.params;

    const [animal, setAnimal] = useState<Animal | null>(null);
    const [responsavel, setResponsavel] = useState<Responsavel | null>(null);
    const [consultas, setConsultas] = useState<Consulta[]>([]);

    // controla se o modal de edição está aberto
    const [modalVisivel, setModalVisivel] = useState(false);

    // campos do formulário de edição
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

    // carrega os dados quando a tela abre
    useEffect(() => {
        carregarDados();
    }, []);

    async function carregarDados() {

        // busca a ficha completa: animal + responsável + histórico de consultas
        const ficha = await pacienteController.buscarFichaCompleta(id_animal);
        setAnimal(ficha.animal);
        setResponsavel(ficha.responsavel);
        setConsultas(ficha.consultas);
    }

    // preenche os campos do modal com os dados atuais antes de abrir
    function abrirModalEditar() {
        if (!animal || !responsavel) return;
        setNmAnimal(animal.nm_animal);
        setEspecieAnimal(animal.especie_animal);
        setRacaAnimal(animal.raca_animal);
        setDtNascimento(animal.dt_nascimento_animal);
        setPesoAnimal(animal.peso_animal);
        setRgAnimal(animal.rg_animal);
        setMicrochip(animal.nr_microchip_animal);
        setNmResponsavel(responsavel.nm_responsavel);
        setCpfResponsavel(responsavel.cpf_responsavel);
        setTelefoneResponsavel(responsavel.nr_telefone_responsavel);
        setModalVisivel(true);
    }

    async function handleSalvar() {
        if (!animal || !responsavel) return;

        if (!nmAnimal || !especieAnimal || !nmResponsavel || !cpfResponsavel || !telefoneResponsavel) {
            Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
            return;
        }

        // salva as alterações mantendo os outros dados intactos com o spread
        await pacienteController.atualizarAnimal({
            ...animal,
            nm_animal: nmAnimal,
            especie_animal: especieAnimal,
            raca_animal: racaAnimal,
            dt_nascimento_animal: dtNascimento,
            peso_animal: pesoAnimal,
            rg_animal: rgAnimal,
            nr_microchip_animal: microchip,
        });

        await pacienteController.atualizarResponsavel({
            ...responsavel,
            nm_responsavel: nmResponsavel,
            cpf_responsavel: cpfResponsavel,
            nr_telefone_responsavel: telefoneResponsavel,
        });

        setModalVisivel(false);

        // recarrega os dados na tela depois de salvar
        carregarDados();
    }

    async function handleRemover() {
        if (!animal || !responsavel) return;

        Alert.alert(
            "Remover Paciente",
            "Deseja realmente remover este paciente? Todas as consultas associadas também serão removidas.",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Remover",
                    style: "destructive",
                    onPress: async () => {
                        await pacienteController.removerPaciente(
                            animal.id_animal,
                            responsavel.id_responsavel
                        );

                        // volta pra tela anterior depois de remover
                        navigation.goBack();
                    },
                },
            ]
        );
    }

    // enquanto os dados não chegaram, mostra "Carregando..."
    if (!animal || !responsavel) {
        return (
            <View style={styles.containerVazio}>
                <Text style={styles.textoVazio}>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>

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

                    {/* botão verde de abrir whatsapp */}
                    <TouchableOpacity
                        style={styles.botaoWhatsApp}
                        onPress={() =>
                            Alert.alert("WhatsApp", `Abrindo conversa com ${responsavel.nm_responsavel} pelo WhatsApp.`)
                        }
                    >
                        <Ionicons name="logo-whatsapp" size={18} color={colors.white} />
                        <Text style={styles.textoBotaoWhatsApp}>Abrir WhatsApp</Text>
                    </TouchableOpacity>
                </View>

                {/* histórico de consultas — cada card é clicável */}
                <View style={styles.secao}>
                    <Text style={styles.tituloSecao}>Histórico de Consultas</Text>

                    {consultas.length === 0 ? (
                        <Text style={styles.textoSemConsulta}>Nenhuma consulta registrada.</Text>
                    ) : (
                        consultas.map(consulta => {
                            const statusEstilo = getStatusEstilo(consulta.st_consulta);
                            return (
                                <TouchableOpacity
                                    key={consulta.id_consulta}
                                    style={styles.cardConsulta}
                                    // clicou no card — vai pros detalhes da consulta
                                    onPress={() =>
                                        navigation.navigate("DetalheConsulta", {
                                            id_consulta: consulta.id_consulta,
                                        })
                                    }
                                    activeOpacity={0.7}
                                >
                                    <View style={styles.linhaConsulta}>
                                        <Text style={styles.textoConsultaMotivo}>
                                            {consulta.historico_consulta}
                                        </Text>
                                        <View style={[styles.tagStatus, { backgroundColor: statusEstilo.bg }]}>
                                            <Text style={[styles.textoStatus, { color: statusEstilo.texto }]}>
                                                {consulta.st_consulta}
                                            </Text>
                                        </View>
                                    </View>
                                    <Text style={styles.textoConsultaData}>
                                        {consulta.dt_consulta} às {consulta.hr_consulta}
                                    </Text>
                                    <View style={styles.linhaVerDetalhes}>
                                        <Text style={styles.textoVerDetalhes}>Ver detalhes</Text>
                                        <Ionicons name="chevron-forward" size={14} color={colors.bluePrimary} />
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    )}
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

            {/* modal de edição do animal e responsável */}
            <Modal visible={modalVisivel} animationType="slide" transparent>
                <KeyboardAvoidingView
                    style={styles.modalOverlay}
                    behavior={Platform.OS === "ios" ? "padding" : undefined}
                >
                    <View style={styles.modalContainer}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={styles.modalTitulo}>Editar Paciente</Text>

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
                            <CustomTextInput title="Telefone do Responsável *" placeholder="Ex: (11) 99999-9999" value={telefoneResponsavel} onChangeText={setTelefoneResponsavel} keyboardType="numeric" />

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