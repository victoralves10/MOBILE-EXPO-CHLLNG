import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTema } from "../../theme/TemaContext";
import { transparente } from "../../theme/paletas";

interface Props {
    icone: keyof typeof Ionicons.glyphMap;
    cor: string;
    texto: string;
}

// título de uma parte do formulário
export default function TituloSecao({ icone, cor, texto }: Props) {
    const { cores } = useTema();

    return (
        <View style={estilos.linha}>
            <View style={[estilos.icone, { backgroundColor: transparente(cor, 0.15) }]}>
                <Ionicons name={icone} size={16} color={cor} />
            </View>
            <Text style={[estilos.texto, { color: cores.texto }]}>{texto}</Text>
        </View>
    );
}

const estilos = StyleSheet.create({
    linha: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 8,
        marginBottom: 14,
    },
    icone: {
        width: 30,
        height: 30,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    texto: {
        fontSize: 17,
        fontWeight: "800",
    },
});
