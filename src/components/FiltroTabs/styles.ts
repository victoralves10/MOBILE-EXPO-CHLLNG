import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 8,
    },
    aba: {
        flex: 1,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.grayMedium,
        alignItems: "center",
    },
    textoAba: {
        fontSize: 13,
        color: colors.gray,
        fontWeight: "600",
    },
    textoAbaAtiva: {
        color: colors.white,
        fontWeight: "700",
    },
});
