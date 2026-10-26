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

    resultados: {
        borderRadius: 14,
        overflow: "hidden",
    },

    vazio: {
        fontSize: 13,
        color: colors.gray,
        marginVertical: 8,
    },

    // caixinha azul clara com o item escolhido
    escolhido: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.bluePrimary + "12",
        borderRadius: 14,
        padding: 14,
    },

    escolhidoTextos: {
        flex: 1,
    },

    escolhidoTitulo: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.dark,
    },

    escolhidoSubtitulo: {
        fontSize: 13,
        color: colors.gray,
        marginTop: 2,
    },

    trocar: {
        fontSize: 14,
        fontWeight: "700",
        color: colors.bluePrimary,
    },
});
