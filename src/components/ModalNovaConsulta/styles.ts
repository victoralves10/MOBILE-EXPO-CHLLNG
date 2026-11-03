import { StyleSheet } from "react-native";
import { Cores } from "../../theme/paletas";

export const criarEstilos = (c: Cores) =>
    StyleSheet.create({

        abas: {
            marginBottom: 16,
        },

        dica: {
            fontSize: 12,
            color: c.textoSuave,
            marginTop: -8,
            marginBottom: 16,
            marginLeft: 2,
        },
    });
