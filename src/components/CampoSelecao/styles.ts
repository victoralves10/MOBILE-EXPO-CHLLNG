import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        width: "100%",
    },

    titulo: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.dark,
        marginBottom: 8,
    },

    // mesmo visual do CustomTextInput
    campo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        backgroundColor: colors.grayLight,
        borderRadius: 14,
        paddingHorizontal: 16,
        height: 54,
    },

    texto: {
        flex: 1,
        fontSize: 16,
        color: colors.dark,
    },

    placeholder: {
        color: "#999",
    },
});
