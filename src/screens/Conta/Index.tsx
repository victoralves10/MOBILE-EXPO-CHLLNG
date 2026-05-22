import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ScrollView,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { PieChart } from "react-native-chart-kit";
import { styles } from "./styles";
import { colors } from "../../global/colors";
import { authController } from "../../controllers/authController";
import { consultaController } from "../../controllers/consultaController";
import { User } from "../../models/User";

// pega a largura da tela pra calcular o tamanho do gráfico
const screenWidth = Dimensions.get("window").width;

export default function Conta() {

    // dados do usuário logado
    const [usuario, setUsuario] = useState<User | null>(null);

    // contadores de consultas por status
    const [totalConsultas, setTotalConsultas] = useState(0);
    const [concluidas, setConcluidas] = useState(0);
    const [atrasadas, setAtrasadas] = useState(0);
    const [agendadas, setAgendadas] = useState(0);

    const navigation = useNavigation<any>();

    // carrega os dados quando a tela abre
    useEffect(() => {
        carregarDados();
    }, []);

    async function carregarDados() {

        // busca o usuário logado no asyncstorage
        const user = await authController.buscarUsuarioLogado();
        setUsuario(user);

        // busca todas as consultas e conta por status pra montar o gráfico
        const todas = await consultaController.buscarTodas();
        setTotalConsultas(todas.length);
        setConcluidas(todas.filter(c => c.st_consulta === "Concluido").length);
        setAtrasadas(todas.filter(c => c.st_consulta === "Atrasado").length);
        setAgendadas(todas.filter(c => c.st_consulta === "Agendado").length);
    }

    async function handleLogout() {
        Alert.alert(
            "Sair",
            "Deseja realmente sair da sua conta?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sair",
                    style: "destructive",
                    onPress: async () => {

                        // limpa a sessão do asyncstorage e volta pro login
                        await authController.fazerLogout();
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "Login" }],
                        });
                    },
                },
            ]
        );
    }

    // dados que alimentam o gráfico de pizza
    const dadosGrafico = [
        {
            name: "Concluídas",
            population: concluidas || 0,
            color: colors.success,
            legendFontColor: colors.dark,
            legendFontSize: 13,
        },
        {
            name: "Atrasadas",
            population: atrasadas || 0,
            color: colors.danger,
            legendFontColor: colors.dark,
            legendFontSize: 13,
        },
        {
            name: "Agendadas",
            population: agendadas || 0,
            color: colors.bluePrimary,
            legendFontColor: colors.dark,
            legendFontSize: 13,
        },
    ];

    // pega a primeira letra do nome pra mostrar no avatar
    const inicial = usuario?.nm_usuario
        ? usuario.nm_usuario.charAt(0).toUpperCase()
        : "U";

    return (
        <ScrollView style={styles.container}>

            {/* header com avatar, nome e email */}
            <View style={styles.containerHeader}>
                <View style={styles.containerAvatar}>
                    <Text style={styles.textoInicialAvatar}>{inicial}</Text>
                </View>
                <Text style={styles.textoNome}>
                    {usuario?.nm_usuario ?? "Usuário"}
                </Text>
                <Text style={styles.textoEmail}>
                    {usuario?.email ?? ""}
                </Text>
            </View>

            {/* card do gráfico de desempenho */}
            <View style={styles.containerGrafico}>
                <Text style={styles.tituloGrafico}>Desempenho do Veterinário</Text>

                {/* número grande de total de consultas */}
                <View style={styles.containerTotalConsultas}>
                    <Text style={styles.textoTotalNumero}>{totalConsultas}</Text>
                    <Text style={styles.textoTotalLabel}>consultas no total</Text>
                </View>

                {/* se tiver consultas mostra o gráfico, se não mostra mensagem */}
                {totalConsultas > 0 ? (
                    <PieChart
                        data={dadosGrafico}
                        width={screenWidth - 32}
                        height={180}
                        chartConfig={{
                            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        }}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="10"
                        absolute
                    />
                ) : (
                    <Text style={styles.textoSemDados}>Nenhuma consulta registrada ainda.</Text>
                )}

                {/* legenda manual abaixo do gráfico com bolinhas coloridas */}
                <View style={styles.containerResumo}>
                    <View style={styles.itemResumo}>
                        <View style={[styles.bolinha, { backgroundColor: colors.success }]} />
                        <Text style={styles.textoItemResumo}>Concluídas: {concluidas}</Text>
                    </View>
                    <View style={styles.itemResumo}>
                        <View style={[styles.bolinha, { backgroundColor: colors.danger }]} />
                        <Text style={styles.textoItemResumo}>Atrasadas: {atrasadas}</Text>
                    </View>
                    <View style={styles.itemResumo}>
                        <View style={[styles.bolinha, { backgroundColor: colors.bluePrimary }]} />
                        <Text style={styles.textoItemResumo}>Agendadas: {agendadas}</Text>
                    </View>
                </View>
            </View>

            {/* seção de menu com opções em breve */}
            <View style={styles.containerSecao}>
                <TouchableOpacity
                    style={styles.itemMenu}
                    onPress={() => Alert.alert("Em breve", "Funcionalidade em desenvolvimento.")}
                >
                    <Ionicons name="person-outline" size={22} color={colors.bluePrimary} />
                    <Text style={styles.textoItemMenu}>Meu Perfil</Text>
                    <Ionicons name="chevron-forward" size={20} color={colors.grayMedium} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.itemMenu}
                    onPress={() => Alert.alert("Em breve", "Funcionalidade em desenvolvimento.")}
                >
                    <Ionicons name="notifications-outline" size={22} color={colors.bluePrimary} />
                    <Text style={styles.textoItemMenu}>Notificações</Text>
                    <Ionicons name="chevron-forward" size={20} color={colors.grayMedium} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.itemMenu}
                    onPress={() => Alert.alert("Em breve", "Funcionalidade em desenvolvimento.")}
                >
                    <Ionicons name="shield-checkmark-outline" size={22} color={colors.bluePrimary} />
                    <Text style={styles.textoItemMenu}>Privacidade</Text>
                    <Ionicons name="chevron-forward" size={20} color={colors.grayMedium} />
                </TouchableOpacity>
            </View>

            {/* botão de sair da conta */}
            <View style={styles.containerSecao}>
                <TouchableOpacity
                    style={[styles.itemMenu, styles.itemMenuPerigo]}
                    onPress={handleLogout}
                >
                    <Ionicons name="log-out-outline" size={22} color={colors.danger} />
                    <Text style={[styles.textoItemMenu, styles.textoItemMenuPerigo]}>
                        Sair da conta
                    </Text>
                </TouchableOpacity>
            </View>

            {/* versão do app no rodapé */}
            <View style={styles.containerVersao}>
                <Text style={styles.textoVersao}>ClyvoVet v1.0.0</Text>
            </View>

        </ScrollView>
    );
}