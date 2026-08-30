import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({
    fundo: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "flex-end",
    },

    card: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: "85%",
    },

    barraArrasto: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: colors.grayMedium,
        alignSelf: "center",
        marginTop: 12,
    },

    scrollConteudo: {
        padding: 24,
        gap: 4,
    },

    titulo: {
        fontSize: 18,
        fontWeight: "800",
        color: colors.dark,
        marginBottom: 8,
    },

    containerBotoes: {
        flexDirection: "row",
        gap: 12,
        marginTop: 16,
    },

    botaoCancelar: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        backgroundColor: colors.grayLight,
    },

    textoBotaoCancelar: {
        fontSize: 15,
        fontWeight: "600",
        color: colors.dark,
    },

    botaoSalvar: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        backgroundColor: colors.bluePrimary,
    },

    textoBotaoSalvar: {
        fontSize: 15,
        fontWeight: "700",
        color: colors.white,
    },
});