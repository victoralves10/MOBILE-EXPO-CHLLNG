import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { colors } from "../../global/colors";
import CustomTextInput from "../../components/CustomTextInput/Index";
import ConsultaCard from "../../components/ConsultaCard/Index";
import FiltroTabs from "../../components/FiltroTabs/Index";
import ModalNovaConsulta from "../../components/ModalNovaConsulta/Index";
import TelaCarregando from "../../components/TelaCarregando/Index";
import { useConsultas } from "../../hooks/useConsultas";
import { AbaConsulta } from "../../models/Consulta";

// as 3 abas da tela, cada uma com a sua cor
const ABAS: { valor: AbaConsulta; label: string; cor: string }[] = [
    { valor: "agendadas", label: "Agendadas", cor: colors.bluePrimary },
    { valor: "atrasadas", label: "Atrasadas", cor: colors.danger },
    { valor: "concluidas", label: "Concluídas", cor: colors.success },
];

// tela de consultas: busca, abas, lista e o botão de nova consulta
export default function ConsultaTela() {
    const { aba, setAba, busca, setBusca, consultas, carregando, erro, abrirDetalheConsulta } = useConsultas();

    // modal de nova consulta aberto ou fechado (a lógica dele fica no próprio modal)
    const [modalAberto, setModalAberto] = useState(false);

    return (
        <View style={styles.container}>

            {/* barra de busca + abas */}
            <View style={styles.containerBusca}>
                <CustomTextInput
                    placeholder="Buscar pelo nome do animal..."
                    leftIconName="search"
                    value={busca}
                    onChangeText={setBusca}
                    containerStyle={{ marginBottom: 0 }}
                />

                <FiltroTabs opcoes={ABAS} valorSelecionado={aba} onSelecionar={setAba} />
            </View>

            {/* lista de consultas da aba escolhida, num painel branco tipo lista de contatos */}
            <View style={styles.containerLista}>
                {carregando ? (
                    <TelaCarregando telaCheia />
                ) : consultas.length === 0 ? (
                    <Text style={styles.textoVazio}>{erro ?? "Nenhuma consulta encontrada."}</Text>
                ) : (
                    <View style={styles.painelLista}>
                        <FlatList
                            data={consultas}
                            keyExtractor={(item) => String(item.id_consulta)}
                            renderItem={({ item }) => (
                                <ConsultaCard consulta={item} onPress={() => abrirDetalheConsulta(item.id_consulta)} />
                            )}
                            showsVerticalScrollIndicator={false}
                            ListFooterComponent={<View style={{ height: 90 }} />}
                        />
                    </View>
                )}
            </View>

            {/* botão "+" flutuante para criar nova consulta */}
            <TouchableOpacity style={styles.botaoAdicionar} onPress={() => setModalAberto(true)}>
                <Ionicons name="add" size={32} color={colors.white} />
            </TouchableOpacity>

            {/* modal de criar nova consulta */}
            <ModalNovaConsulta visivel={modalAberto} onFechar={() => setModalAberto(false)} />

        </View>
    );
}
