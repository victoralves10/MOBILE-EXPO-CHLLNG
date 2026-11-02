import { StyleSheet } from "react-native";
import { Cores } from "../../theme/paletas";

export const criarEstilos = (c: Cores) =>
    StyleSheet.create({
        container: {
            marginBottom: 16,
            width: "100%",
        },

        titulo: {
            fontSize: 13,
            fontWeight: "700",
            color: c.textoSecundario,
            marginBottom: 8,
            marginLeft: 2,
        },

        // mesmo visual do CustomTextInput
        campo: {
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            backgroundColor: c.superficieAlt,
            borderRadius: 16,
            borderWidth: 1.5,
            borderColor: "transparent",
            paddingHorizontal: 16,
            height: 54,
        },

        campoAberto: {
            borderColor: c.primaria,
            backgroundColor: c.superficie,
        },

        texto: {
            flex: 1,
            fontSize: 16,
            color: c.texto,
        },

        placeholder: {
            color: c.textoSuave,
        },
    });
