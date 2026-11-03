import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { criarEstilos } from "./styles";
import { useEstilos } from "../../theme/useEstilos";
import { useTema } from "../../theme/TemaContext";
import CustomTextInput from "../../components/CustomTextInput/Index";
import ConsultaCard from "../../components/ConsultaCard/Index";
import FiltroTabs from "../../components/FiltroTabs/Index";
import ModalNovaConsulta from "../../components/ModalNovaConsulta/Index";
import TelaCarregando from "../../components/TelaCarregando/Index";
import { useConsultas } from "../../hooks/useConsultas";
import { AbaConsulta } from "../../models/Consulta";

// tela de consultas
export default function ConsultaTela() {
    const styles = useEstilos(criarEstilos);
    const { cores } = useTema();
    const c = useConsultas();

    const abas: { valor: AbaConsulta; label: string; cor: string; icone: keyof typeof Ionicons.glyphMap }[] = [
        { valor: "agendadas", label: "Agendadas", cor: cores.agendado, icone: "time" },
        { valor: "atrasadas", label: "Atrasadas", cor: cores.atrasado, icone: "alert-circle" },
        { valor: "concluidas", label: "Concluídas", cor: cores.concluido, icone: "checkmark-circle" },
    ];

    return (
        <View style={styles.container}>
            {/* busca e abas */}
            <View style={styles.containerBusca}>
                <CustomTextInput
                    placeholder="Buscar pelo nome do animal..."
                    leftIconName="search"
                    value={c.busca}
                    onChangeText={c.setBusca}
                    containerStyle={{ marginBottom: 12 }}
                />
                <FiltroTabs opcoes={abas} valorSelecionado={c.aba} onSelecionar={c.setAba} />
            </View>

            {/* lista */}
            <View style={styles.containerLista}>
                {c.carregando ? (
                    <TelaCarregando telaCheia />
                ) : c.consultas.length === 0 ? (
                    <View style={styles.containerVazio}>
                        <View style={styles.circuloVazio}>
                            <Ionicons name="calendar-clear-outline" size={34} color={cores.primaria} />
                        </View>
                        <Text style={styles.textoVazio}>{c.erro ?? "Nenhuma consulta por aqui."}</Text>
                    </View>
                ) : (
                    <View style={styles.painelLista}>
                        <FlatList
                            data={c.consultas}
                            keyExtractor={(item) => String(item.id_consulta)}
                            renderItem={({ item }) => (
                                <ConsultaCard consulta={item} onPress={() => c.abrirDetalheConsulta(item.id_consulta)} />
                            )}
                            showsVerticalScrollIndicator={false}
                            ListFooterComponent={<View style={{ height: 90 }} />}
                        />
                    </View>
                )}
            </View>

            {/* botão de nova consulta */}
            <TouchableOpacity style={styles.botaoAdicionar} onPress={c.abrirModal} activeOpacity={0.85}>
                <Ionicons name="add" size={30} color={cores.textoSobreCor} />
            </TouchableOpacity>

            <ModalNovaConsulta visivel={c.modalAberto} onFechar={c.fecharModal} />
        </View>
    );
}
