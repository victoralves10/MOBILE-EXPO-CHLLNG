import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { criarEstilos } from "./styles";
import { useEstilos } from "../../theme/useEstilos";
import { useTema } from "../../theme/TemaContext";
import { FiltroTabsProps } from "./types";

// abas tipo "pílula" (ex: Agendadas / Atrasadas / Concluídas), sempre com uma ativa
// a ativa ganha a cor dela; as outras ficam neutras
export default function FiltroTabs<T extends string>({ opcoes, valorSelecionado, onSelecionar }: FiltroTabsProps<T>) {
    const styles = useEstilos(criarEstilos);
    const { cores } = useTema();

    return (
        <View style={styles.container}>
            {opcoes.map((opcao) => {
                const ativa = opcao.valor === valorSelecionado;
                const corTexto = ativa ? cores.textoSobreCor : cores.textoSecundario;
                return (
                    <TouchableOpacity
                        key={opcao.valor}
                        style={[styles.aba, ativa && { backgroundColor: opcao.cor }]}
                        onPress={() => onSelecionar(opcao.valor)}
                        activeOpacity={0.8}
                    >
                        {opcao.icone && <Ionicons name={opcao.icone} size={15} color={corTexto} />}
                        <Text style={[styles.textoAba, { color: corTexto }]} numberOfLines={1}>
                            {opcao.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
