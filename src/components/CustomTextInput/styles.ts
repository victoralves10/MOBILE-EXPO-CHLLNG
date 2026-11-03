import { StyleSheet } from "react-native";
import { Cores } from "../../theme/paletas";

export const criarEstilos = (c: Cores) =>
    StyleSheet.create({
        container: {
            marginBottom: 16,
            width: "100%",
        },

        title: {
            fontSize: 13,
            fontWeight: "700",
            color: c.textoSecundario,
            marginBottom: 8,
            marginLeft: 2,
        },

        inputContainer: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: c.superficieAlt,
            borderRadius: 16,
            borderWidth: 1.5,
            borderColor: "transparent",
            paddingHorizontal: 16,
            height: 54,
        },

        inputFocado: {
            borderColor: c.primaria,
            backgroundColor: c.superficie,
        },

        input: {
            flex: 1,
            minWidth: 0,
            fontSize: 16,
            color: c.texto,
            paddingVertical: 0,
        },

        leftIcon: {
            marginRight: 10,
        },

        rightIconContainer: {
            marginLeft: 8,
            padding: 4,
        },
    });
