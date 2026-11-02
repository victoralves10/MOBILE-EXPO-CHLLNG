import { StyleSheet } from "react-native";
import { Cores } from "../../theme/paletas";

export const criarEstilos = (c: Cores) =>
    StyleSheet.create({
        // trilho cinza em volta das abas
        container: {
            flexDirection: "row",
            backgroundColor: c.superficieAlt,
            borderRadius: 16,
            padding: 4,
            gap: 4,
        },

        aba: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            paddingVertical: 9,
            borderRadius: 12,
        },

        textoAba: {
            fontSize: 13,
            fontWeight: "700",
        },
    });
