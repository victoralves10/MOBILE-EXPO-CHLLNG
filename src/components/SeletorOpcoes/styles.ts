import { StyleSheet } from "react-native";
import { Cores } from "../../theme/paletas";

export const criarEstilos = (c: Cores) =>
    StyleSheet.create({
        container: {
            marginBottom: 16,
        },

        titulo: {
            fontSize: 13,
            fontWeight: "700",
            color: c.textoSecundario,
            marginBottom: 8,
            marginLeft: 2,
        },

        linha: {
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
        },

        etiqueta: {
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            paddingHorizontal: 14,
            paddingVertical: 9,
            borderRadius: 20,
            backgroundColor: c.superficieAlt,
        },

        etiquetaAtiva: {
            backgroundColor: c.secundaria,
        },

        texto: {
            fontSize: 13,
            color: c.texto,
            fontWeight: "600",
        },

        textoAtivo: {
            color: c.textoSobreCor,
            fontWeight: "800",
        },
    });
