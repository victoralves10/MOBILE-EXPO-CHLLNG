import { StyleSheet } from "react-native";
import { Cores } from "../../theme/paletas";

export const criarEstilos = (c: Cores) =>
    StyleSheet.create({
        caixa: {
            marginTop: -6,
            marginBottom: 16,
            borderRadius: 18,
            overflow: "hidden",
            backgroundColor: c.superficie,
            borderWidth: 1,
            borderColor: c.borda,
        },

        linhaAno: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            paddingTop: 12,
        },

        botaoAno: {
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: c.superficieAlt,
            alignItems: "center",
            justifyContent: "center",
        },

        textoAno: {
            fontSize: 17,
            fontWeight: "800",
            color: c.texto,
        },
    });
