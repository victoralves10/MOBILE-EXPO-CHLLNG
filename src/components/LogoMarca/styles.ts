import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({
    // Agrupa ícone + nome + linha decorativa + subtítulo do logo
    containerLogo: {
        alignItems: "center",
        marginBottom: 36,
        gap: 8,
    },

    // Círculo azul atrás do ícone de pata — sombra colorida pra dar
    // um leve efeito de destaque, sem exagerar
    circuloLogo: {
        width: 88,
        height: 88,
        borderRadius: 24,
        backgroundColor: colors.bluePrimary,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 4,

        elevation: 8,
        shadowColor: colors.bluePrimary,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
    },

    // Nome da marca
    textoMarca: {
        fontSize: 30,
        fontWeight: "800",
        color: colors.blueDark,
        letterSpacing: 1,
    },

    // Parte "ELLV" com peso ainda maior, pra ficar levemente destacada
    textoMarcaDestaque: {
        fontWeight: "900",
        color: colors.bluePrimary,
    },

    // Linha decorativa curta, abaixo do nome
    linhaDecorativa: {
        width: 48,
        height: 3,
        backgroundColor: colors.bluePrimary,
        borderRadius: 2,
        marginTop: 4,
    },

    // Subtítulo pequeno, em caixa alta com espaçamento entre letras
    textoMarcaSub: {
        fontSize: 11,
        color: colors.gray,
        letterSpacing: 2,
        textTransform: "uppercase",
    },
});