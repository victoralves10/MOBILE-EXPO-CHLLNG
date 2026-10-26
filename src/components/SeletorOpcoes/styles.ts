import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },

    titulo: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.dark,
        marginBottom: 8,
    },

    // etiquetas quebram linha sozinhas
    linha: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },

    etiqueta: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: colors.grayLight,
    },

    etiquetaAtiva: {
        backgroundColor: colors.bluePrimary,
    },

    texto: {
        fontSize: 13,
        color: colors.dark,
        fontWeight: "600",
    },

    textoAtivo: {
        color: colors.white,
    },
});
