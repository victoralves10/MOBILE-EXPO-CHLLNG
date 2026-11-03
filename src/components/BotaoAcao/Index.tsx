import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTema } from "../../theme/TemaContext";
import { transparente } from "../../theme/paletas";

interface Props {
    icone: keyof typeof Ionicons.glyphMap;
    texto: string;
    cor: string;
    onPress: () => void;
}

// botão de ação rápida
export default function BotaoAcao({ icone, texto, cor, onPress }: Props) {
    const { cores } = useTema();

    return (
        <TouchableOpacity
            style={[estilos.botao, { backgroundColor: cores.superficie, borderColor: cores.borda }]}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View style={[estilos.circulo, { backgroundColor: transparente(cor, 0.15) }]}>
                <Ionicons name={icone} size={22} color={cor} />
            </View>
            <Text style={[estilos.texto, { color: cores.texto }]} numberOfLines={1}>{texto}</Text>
        </TouchableOpacity>
    );
}

const estilos = StyleSheet.create({
    botao: {
        flex: 1,
        alignItems: "center",
        gap: 8,
        paddingVertical: 14,
        borderRadius: 20,
        borderWidth: 1,
    },
    circulo: {
        width: 46,
        height: 46,
        borderRadius: 23,
        alignItems: "center",
        justifyContent: "center",
    },
    texto: {
        fontSize: 12,
        fontWeight: "700",
    },
});
