import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Toast, { ToastConfig } from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { useTema } from "./TemaContext";
import { transparente } from "./paletas";

// um Toast com o visual do app (claro ou escuro, com ícone e faixa colorida)
// é usado no App.tsx e dentro do ModalFormulario
export default function ToastTema() {
    const { cores } = useTema();

    // monta um tipo de toast com a cor e o ícone dele
    function modelo(cor: string, icone: keyof typeof Ionicons.glyphMap) {
        return ({ text1 }: { text1?: string }) => (
            <View style={[estilos.caixa, { backgroundColor: cores.superficie, borderColor: cores.borda, shadowColor: cores.sombra }]}>
                <View style={[estilos.icone, { backgroundColor: transparente(cor, 0.15) }]}>
                    <Ionicons name={icone} size={20} color={cor} />
                </View>
                <Text style={[estilos.texto, { color: cores.texto }]}>{text1}</Text>
            </View>
        );
    }

    const config: ToastConfig = {
        success: modelo(cores.concluido, "checkmark-circle"),
        error: modelo(cores.atrasado, "close-circle"),
        info: modelo(cores.primaria, "information-circle"),
    };

    return <Toast config={config} />;
}

const estilos = StyleSheet.create({
    caixa: {
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 12,
        borderRadius: 16,
        borderWidth: 1,
        elevation: 6,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
    },
    icone: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
    },
    texto: {
        flex: 1,
        fontSize: 14,
        fontWeight: "600",
    },
});
