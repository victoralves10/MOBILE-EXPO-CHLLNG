import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../global/colors";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: colors.grayLight,
    },

    containerCarrossel: {
        backgroundColor: colors.white,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.grayLight,
    },

    // agrupa o título + o badge com o contador
    containerTitulo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 16,
        marginBottom: 12,
    },

    tituloSecao: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.dark,
    },

    // bolinha azul com o número de consultas agendadas
    badgeContador: {
        backgroundColor: colors.bluePrimary,
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        paddingHorizontal: 6,
        alignItems: "center",
        justifyContent: "center",
    },

    textoBadgeContador: {
        color: colors.white,
        fontSize: 11,
        fontWeight: "700",
    },

    flatListCarrossel: {
        paddingHorizontal: 16,
    },

    cardCarrossel: {
        width: width * 0.75,
        marginRight: 12,
    },

    // estado vazio, com ícone acima do texto
    containerVazio: {
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 20,
        gap: 8,
    },

    textoVazioCarrossel: {
        color: colors.gray,
        fontSize: 14,
        textAlign: "center",
    },

    containerDestaque: {
        flex: 1,
        padding: 16,
    },

    tituloDestaque: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.dark,
        marginBottom: 12,
    },

    imagemDestaque: {
        flex: 1,
        width: "100%",
        borderRadius: 16,
        overflow: "hidden",
    },
});