import {
    View,
    Text,
    StatusBar,
    FlatList,
    TouchableOpacity,
    Modal,
    ScrollView,
    Alert
} from "react-native";

import { useState } from "react";
import { Calendar } from "react-native-calendars";
import { styles } from "./styles";
import { colors } from "../../global/colors";
import CustomTextInput from "../../components/CustomTextInput/Index";
import { Ionicons } from '@expo/vector-icons'; 
import AntDesign from '@expo/vector-icons/AntDesign';

// consultas fixas para ajudar na visão
const CONSULTAS = [
    {
        id_consulta: "1",
        historico_consulta: "Animal apresentou febre leve. Medicado com antipirético.",
        st_consulta: "Concluída",
        dt_consulta: "2026-05-10 20:00",
        tutor: {
            id_tutor: "1",
            cpf_tutor: "123.456.789-00",
            nm_tutor: "João da Silva",
            nr_telefone_tutor: "(11) 9999-9999",
        },
        animal: {
            id_animal: "1",
            rg_animal: "RG-001",
            nr_microchip_animal: "123456789",
            nm_animal: "Thor",
            dt_nascimento_animal: "2022-03-15",
            peso_animal: "32 kg",
            especie_animal: "Canina",
            raca_animal: "Golden Retriever",
        },
    },
    {
        id_consulta: "2",
        historico_consulta: "Vacinação anual realizada com sucesso.",
        st_consulta: "Agendada",
        dt_consulta: "2026-05-11 20:00",
        tutor: {
            id_tutor: "2",
            cpf_tutor: "987.654.321-00",
            nm_tutor: "Maria Souza",
            nr_telefone_tutor: "(11) 8888-8888",
        },
        animal: {
            id_animal: "2",
            rg_animal: "RG-002",
            nr_microchip_animal: "987654321",
            nm_animal: "Luna",
            dt_nascimento_animal: "2023-01-20",
            peso_animal: "28 kg",
            especie_animal: "Canina",
            raca_animal: "Labrador Retriever",
        },
    },
    {
        id_consulta: "3",
        historico_consulta: "Consulta de rotina. Animal saudável.",
        st_consulta: "Atrasada",
        dt_consulta: "2026-05-12 20:00",
        tutor: {
            id_tutor: "3",
            cpf_tutor: "111.222.333-44",
            nm_tutor: "Pedro Lima",
            nr_telefone_tutor: "(11) 7777-7777",
        },
        animal: {
            id_animal: "3",
            rg_animal: "RG-003",
            nr_microchip_animal: "111222333",
            nm_animal: "Mimi",
            dt_nascimento_animal: "2024-06-10",
            peso_animal: "4 kg",
            especie_animal: "Felina",
            raca_animal: "Gato Persa",
        },
    },
];

// Status para filtro
const LISTA_STATUS = ["Todos", "Concluída", "Agendada", "Atrasada"];

export default function Consulta() {


    // Estado da busca
    const [textoBusca, setTextoBusca] = useState("");

    // Estado do filtro da data selecionada no calendario
    const [dataSelecionada, setDataSelecionada] = useState<string | null>(null);

    // Estado do status escolhido
    const [statusSelecionado, setStatusSelecionado] = useState("Todos");

    // Controla abertura do modal do filtro
    const [modalFiltroVisivel, setModalFiltroVisivel] = useState(false);

    // Filtra consultas conforme (busca, data, status)
    const consultasFiltradas = CONSULTAS.filter((c) => {
        const dataConsulta = c.dt_consulta.split(" ")[0];

        const bateBusca =
            c.animal.nm_animal.toLowerCase().includes(textoBusca.toLowerCase()) ||
            c.tutor.nm_tutor.toLowerCase().includes(textoBusca.toLowerCase());

        const bateData = dataSelecionada ? dataConsulta === dataSelecionada : true;

        const bateStatus = statusSelecionado === "Todos" ? true : c.st_consulta === statusSelecionado;

        return bateBusca && bateData && bateStatus;
    });

    // Formata data: "Hoje • 20:00" OU "Seg, 11 Mai • 20:00"
    function formatarData(dtConsulta: string) {
    const [data, hora] = dtConsulta.split(" ");
    const [ano, mes, dia] = data.split("-");

    const dataObj = new Date(Number(ano), Number(mes) - 1, Number(dia));
    const hoje = new Date();

    const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

    const ehHoje =
        dataObj.getDate() === hoje.getDate() &&
        dataObj.getMonth() === hoje.getMonth() &&
        dataObj.getFullYear() === hoje.getFullYear();

    if (ehHoje) {
        return { texto: `Hoje • ${hora}`, cor: colors.orange };
    }

    const diaSemana = diasSemana[dataObj.getDay()];
    const nomeMes = meses[dataObj.getMonth()];

    return { texto: `${diaSemana}, ${dia} ${nomeMes} • ${hora}`, cor: colors.bluePrimary };
    }

    // Retorna a cor conforme o status da consulta
    function corDoStatus(status: string) {
        if (status === "Concluída") return colors.success;
        if (status === "Agendada") return colors.bluePrimary;
        if (status === "Atrasada") return colors.danger;
        return colors.gray;
    }

    // Limpa todos os filtros
    function limparFiltros() {
        setDataSelecionada(null);
        setStatusSelecionado("Todos");
        setModalFiltroVisivel(false);
    }
    
    return (
        <View style={styles.telaPrincipal}>

            <StatusBar backgroundColor={colors.black} barStyle="light-content"/>

            {/* BARRA DE PESQUISA */}
            <View style={styles.areaBusca}>
                <CustomTextInput
                    placeholder="Buscar consulta..."
                    leftIconName="search"
                    rightIconName="ellipsis-vertical"
                    onRightIconPress={() => setModalFiltroVisivel(true)}
                    rightIconType="button"
                    value={textoBusca}
                    onChangeText={setTextoBusca}
                />
            </View>

            {/* MODAL DE FILTRO */}
            <Modal
                visible={modalFiltroVisivel}
                transparent
                animationType="slide"
                onRequestClose={() => setModalFiltroVisivel(false)}
            >
                {/* FUNDO ESCURO - fecha modal clicando fora */}
                <TouchableOpacity
                    style={styles.modalFundo}
                    onPress={() => setModalFiltroVisivel(false)}
                >
                    <View style={styles.modalConteudo}>

                        <Text style={styles.modalTitulo}>Filtrar consultas</Text>

                        {/* CALENDÁRIO */}
                        <Text style={styles.modalSubtitulo}>Data</Text>
                        <Calendar
                            onDayPress={(day: any) => setDataSelecionada(day.dateString)}
                            markedDates={
                                dataSelecionada
                                    ? { [dataSelecionada]: { selected: true, selectedColor: colors.bluePrimary } }
                                    : {}
                            }
                            theme={{
                                todayTextColor: colors.danger,
                                selectedDayBackgroundColor: colors.bluePrimary,
                                arrowColor: colors.bluePrimary,
                            }}
                        />

                        {/* FILTRO DE STATUS */}
                        <Text style={styles.modalSubtitulo}>Status</Text>
                        <View style={styles.areaStatus}>
                            {LISTA_STATUS.map((s) => (
                                <TouchableOpacity
                                    key={s}
                                    style={[
                                        styles.botaoStatus,
                                        statusSelecionado === s && { backgroundColor: corDoStatus(s) },
                                    ]}
                                    onPress={() => setStatusSelecionado(s)}
                                >
                                    <Text style={[
                                        styles.textoStatus,
                                        statusSelecionado === s && styles.textoStatusAtivo,
                                    ]}>
                                        {s}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* BOTÕES DE AÇÃO */}
                        <View style={styles.areaAcoes}>

                            {/* LIMPAR FILTROS */}
                            <TouchableOpacity
                                style={styles.botaoLimpar}
                                onPress={limparFiltros}
                            >
                                <Text style={styles.textoBotaoLimpar}>Limpar</Text>
                            </TouchableOpacity>

                            {/* APLICAR FILTROS */}
                            <TouchableOpacity
                                style={styles.botaoAplicar}
                                onPress={() => setModalFiltroVisivel(false)}
                            >
                                <Text style={styles.textoBotaoAplicar}>Aplicar</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </TouchableOpacity>
            </Modal>

            {/* LISTA DE CONSULTAS */}
            <FlatList
                data={consultasFiltradas}
                keyExtractor={(item) => item.id_consulta}
                contentContainerStyle={{ paddingBottom: 100 }}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => (

                    // CARD RESUMIDO DE CADA CONSULTA
                    <TouchableOpacity
                        style={styles.cardConsulta}
                        onPress={() => console.log("ver detalhes")}
                    >

                        {/* BADGE DE STATUS */}
                        <View style={[styles.badgeStatus, { backgroundColor: corDoStatus(item.st_consulta) }]}>
                            <Text style={styles.textoBadgeStatus}>{item.st_consulta}</Text>
                        </View>

                        {/* DATA E HORA */}
                        <Text style={[styles.textoDataHora, { color: formatarData(item.dt_consulta).cor }]}>
                            {formatarData(item.dt_consulta).texto}
                        </Text>

                        {/* NOME DO ANIMAL */}
                        <Text style={styles.textoNomeAnimal}>🐾 {item.animal.nm_animal}</Text>

                        {/* ESPECIE DO ANIMAL */}
                        <Text style={styles.textoNomeAnimal}>  • {item.animal.especie_animal}</Text>

                        {/* RAÇA DO ANIMAL */}
                        <Text style={styles.textoNomeAnimal}>  • {item.animal.raca_animal}</Text>

                        <View style={{ height: 8 }} />


                        {/* NOME DO TUTOR */}
                        <Text style={styles.textoNomeTutor}>👤 {item.tutor.nm_tutor}</Text>

                        {/* NOME DO TUTOR */}
                        <Text style={styles.textoNomeTutor}>  • {item.tutor.nr_telefone_tutor}</Text>

                        {/* ÍCONE LINK */}
                        <TouchableOpacity 
                        style={styles.iconeLink}
                        onPress={() => {
                            Alert.alert(
                            "Ir para consulta", 
                            `Consulta #${item.id_consulta}`, 
                            [
                                { text: "Cancelar" },
                                { text: "Continuar", onPress: () => console.log(`Abrir ${item.id_consulta}`) }
                            ]
                            );
                        }}
                        >
                        <AntDesign name="link" size={60} color={colors.bluePrimary} />
                        </TouchableOpacity>

                    </TouchableOpacity>
                )}
            />

            {/* BOTÃO FLUTUANTE DE ADICIONAR CONSULTA */}
            <TouchableOpacity
                style={styles.botaoAdicionar}
                onPress={() => console.log("adicionar")}
            >
                <Text style={styles.textoBotaoAdicionar}>+</Text>
            </TouchableOpacity>

        </View>
    );
}