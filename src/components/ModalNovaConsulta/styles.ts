import { StyleSheet } from "react-native";
import { Cores } from "../../theme/paletas";

export const criarEstilos = (c: Cores) =>
    StyleSheet.create({
        // título de cada parte do formulário (Consulta, Paciente, Responsável)
        secao: {
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 8,
            marginBottom: 14,
        },

        iconeSecao: {
            width: 30,
            height: 30,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
        },

        textoSecao: {
            fontSize: 17,
            fontWeight: "800",
            color: c.texto,
        },

        rotulo: {
            fontSize: 13,
            fontWeight: "700",
            color: c.textoSecundario,
            marginBottom: 8,
            marginLeft: 2,
        },

        // espaço embaixo das abinhas
        abas: {
            marginBottom: 16,
        },

        // textinho de ajuda embaixo da situação
        dica: {
            fontSize: 12,
            color: c.textoSuave,
            marginTop: -8,
            marginBottom: 16,
            marginLeft: 2,
        },
    });
