import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTema } from "../../theme/TemaContext";
import { transparente } from "../../theme/paletas";

interface Props {
    icone: keyof typeof Ionicons.glyphMap;
    cor: string;
    rotulo: string;
    valor: string;
}

// linha de informação com ícone
export default function LinhaInfo({ icone, cor, rotulo, valor }: Props) {
    const { cores } = useTema();

    return (
        <View style={estilos.linha}>
            <View style={[estilos.caixaIcone, { backgroundColor: transparente(cor, 0.14) }]}>
                <Ionicons name={icone} size={18} color={cor} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={[estilos.rotulo, { color: cores.textoSuave }]}>{rotulo}</Text>
                <Text style={[estilos.valor, { color: cores.texto }]}>{valor}</Text>
            </View>
        </View>
    );
}

const estilos = StyleSheet.create({
    linha: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    caixaIcone: {
        width: 38,
        height: 38,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    rotulo: {
        fontSize: 12,
        fontWeight: "600",
    },
    valor: {
        fontSize: 15,
        fontWeight: "700",
        marginTop: 1,
    },
});
