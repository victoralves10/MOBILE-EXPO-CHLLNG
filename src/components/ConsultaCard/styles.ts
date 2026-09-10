import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({

    card: {
        backgroundColor: colors.white,
        borderRadius: 18,
        marginBottom: 12,
        flexDirection: "row",
        overflow: "hidden",

        elevation: 3,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
    },

    // linha colorida vertical à esquerda, indica o status de relance
    linhaStatus: {
        width: 4,
    },

    containerConteudo: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        padding: 14,
        gap: 12,
    },

    // círculo com a inicial do nome do animal
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: "center",
        justifyContent: "center",
    },

    textoAvatar: {
        fontSize: 18,
        fontWeight: "800",
    },

    containerInfo: {
        flex: 1,
    },

    textoNomeAnimal: {
        fontSize: 15,
        fontWeight: "700",
        color: colors.dark,
    },

    textoEspecie: {
        fontSize: 12,
        color: colors.gray,
        marginTop: 1,
    },

    textoConsulta: {
        fontSize: 13,
        color: colors.dark,
        marginTop: 6,
    },

    containerRodape: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 8,
        gap: 8,
    },

    containerHorario: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        flexShrink: 1,
    },

    textoHorario: {
        fontSize: 11,
        color: colors.gray,
    },

    // badge colorido do status, com ícone pequeno junto
    badgeStatus: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 20,
    },

    textoBadgeStatus: {
        fontSize: 10,
        fontWeight: "700",
    },

    // botão circular do ícone de câmera
    botaoIcone: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.grayLight,
        alignItems: "center",
        justifyContent: "center",
    },
});