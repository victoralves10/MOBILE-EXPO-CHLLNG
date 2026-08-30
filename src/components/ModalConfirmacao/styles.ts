import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({
    fundo: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },

    card: {
        backgroundColor: colors.white,
        borderRadius: 20,
        padding: 24,
        width: "100%",
        gap: 12,
    },

    titulo: {
        fontSize: 18,
        fontWeight: "800",
        color: colors.dark,
    },

    mensagem: {
        fontSize: 14,
        color: colors.gray,
        lineHeight: 20,
    },

    containerBotoes: {
        flexDirection: "row",
        gap: 12,
        marginTop: 8,
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

    botaoConfirmar: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        backgroundColor: colors.bluePrimary,
    },

    // versão vermelha, pra ações destrutivas (ex: apagar conta, sair)
    botaoConfirmarPerigoso: {
        backgroundColor: colors.danger,
    },

    textoBotaoConfirmar: {
        fontSize: 15,
        fontWeight: "700",
        color: colors.white,
    },

    textoBotaoConfirmarPerigoso: {
        color: colors.white,
    },
});