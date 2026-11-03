import React from "react";
import { Text, TouchableOpacity, ActivityIndicator, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTema } from "../../theme/TemaContext";

interface Props {
    texto: string;
    icone?: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    carregando?: boolean;
    style?: ViewStyle;
}

// botão principal
export default function BotaoGradiente({ texto, icone, onPress, carregando = false, style }: Props) {
    const { cores } = useTema();

    return (
        <TouchableOpacity onPress={onPress} disabled={carregando} activeOpacity={0.85} style={style}>
            <LinearGradient
                colors={[cores.primaria, cores.primariaForte]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[estilos.botao, { shadowColor: cores.primaria }, carregando && { opacity: 0.7 }]}
            >
                {carregando ? (
                    <ActivityIndicator color={cores.textoSobreCor} />
                ) : (
                    <>
                        {icone && <Ionicons name={icone} size={20} color={cores.textoSobreCor} />}
                        <Text style={[estilos.texto, { color: cores.textoSobreCor }]}>{texto}</Text>
                    </>
                )}
            </LinearGradient>
        </TouchableOpacity>
    );
}

const estilos = StyleSheet.create({
    botao: {
        height: 56,
        borderRadius: 18,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        elevation: 6,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
    },
    texto: {
        fontSize: 17,
        fontWeight: "800",
    },
});
