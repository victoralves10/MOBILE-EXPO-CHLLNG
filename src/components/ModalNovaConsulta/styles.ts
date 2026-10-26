import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({
    // título de cada parte do formulário (Consulta, Paciente, Responsável)
    secao: {
        fontSize: 13,
        fontWeight: "800",
        color: colors.bluePrimary,
        textTransform: "uppercase",
        letterSpacing: 1,
        marginTop: 12,
        marginBottom: 12,
    },

    rotulo: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.dark,
        marginBottom: 8,
    },

    // espaço embaixo das abinhas
    abas: {
        marginBottom: 16,
    },

    // textinho de ajuda embaixo da situação
    dica: {
        fontSize: 12,
        color: colors.gray,
        marginTop: -8,
        marginBottom: 16,
    },
});
