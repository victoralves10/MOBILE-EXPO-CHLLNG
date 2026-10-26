import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({
    // caixa branca em volta do calendário
    caixa: {
        marginBottom: 16,
        borderRadius: 14,
        overflow: "hidden",
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.grayLight,
    },

    // linha de cima com o ano e as setas
    linhaAno: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        paddingTop: 10,
    },

    botaoAno: {
        padding: 6,
    },

    textoAno: {
        fontSize: 16,
        fontWeight: "800",
        color: colors.dark,
    },
});
