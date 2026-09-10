import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { FiltroTabsProps } from "./types";

// abas de filtro reutilizáveis (ex: Agendado / Atrasado / Concluido),
// sempre com uma opção ativa por vez — não existe estado "nenhuma selecionada"
export default function FiltroTabs<T extends string>({
    opcoes,
    valorSelecionado,
    onSelecionar,
}: FiltroTabsProps<T>) {
    return (
        <View style={styles.container}>
            {opcoes.map((opcao) => {
                const ativa = opcao.valor === valorSelecionado;
                return (
                    <TouchableOpacity
                        key={opcao.valor}
                        style={[
                            styles.aba,
                            ativa && { backgroundColor: opcao.cor, borderColor: opcao.cor },
                        ]}
                        onPress={() => onSelecionar(opcao.valor)}
                        activeOpacity={0.8}
                    >
                        <Text style={[styles.textoAba, ativa && styles.textoAbaAtiva]}>
                            {opcao.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}
