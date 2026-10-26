import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({
    linha: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 16,
        backgroundColor: colors.white,
    },

    caixaIcone: {
        width: 38,
        height: 38,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },

    textos: {
        flex: 1,
    },

    titulo: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.dark,
    },

    subtitulo: {
        fontSize: 13,
        color: colors.gray,
        marginTop: 2,
    },

    // divisória que começa depois do ícone, igual nas configurações do celular
    divisoria: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 16 + 38 + 14,
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.grayMedium,
    },
});