import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({
    containerTela: {
        flex: 1,
        backgroundColor: colors.grayLight,
    },

    containerScroll: {
        padding: 20,
        paddingBottom: 40,
    },

    // cabeçalho
    containerCabecalho: {
        alignItems: "center",
        marginBottom: 24,
    },

    avatar: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: colors.bluePrimary,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,

        elevation: 6,
        shadowColor: colors.bluePrimary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },

    textoAvatar: {
        color: colors.white,
        fontSize: 34,
        fontWeight: "800",
    },

    textoNome: {
        fontSize: 20,
        fontWeight: "800",
        color: colors.dark,
    },

    textoEmail: {
        fontSize: 14,
        color: colors.gray,
        marginTop: 2,
    },

    // grid 2x2 de kpis
    gridKpis: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
        marginBottom: 12,
    },

    cardKpi: {
        width: "47%",
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        alignItems: "center",

        elevation: 2,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
    },

    // destaque sutil quando tem consulta atrasada — borda vermelha fina
    cardKpiAlerta: {
        borderWidth: 1.5,
        borderColor: colors.danger,
    },

    numeroKpi: {
        fontSize: 28,
        fontWeight: "800",
        color: colors.dark,
    },

    labelKpi: {
        fontSize: 12,
        color: colors.gray,
        textAlign: "center",
        marginTop: 4,
    },

    // card de destaque (taxa de retorno) — cor sólida, diferente dos cards brancos
    cardDestaque: {
        backgroundColor: colors.bluePrimary,
        borderRadius: 16,
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,

        elevation: 4,
        shadowColor: colors.bluePrimary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
    },

    containerDestaqueTexto: {
        flex: 1,
        marginRight: 12,
    },

    numeroDestaque: {
        fontSize: 32,
        fontWeight: "900",
        color: colors.white,
    },

    labelDestaque: {
        fontSize: 13,
        color: colors.white,
        opacity: 0.9,
        marginTop: 2,
    },

    // menu
    containerMenu: {
        backgroundColor: colors.white,
        borderRadius: 16,
        marginBottom: 20,
        overflow: "hidden",

        elevation: 2,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 6,
    },

    itemMenu: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.grayLight,
    },

    textoItemMenu: {
        flex: 1,
        fontSize: 15,
        fontWeight: "600",
        color: colors.dark,
    },

    // botão sair
    botaoSair: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        backgroundColor: colors.danger,
        borderRadius: 14,
        paddingVertical: 15,
    },

    textoBotaoSair: {
        color: colors.white,
        fontSize: 15,
        fontWeight: "700",
    },

    // modal (o formulário em si agora é o componente ModalFormulario —
    // só o texto de aviso continua específico desta tela)
    textoAvisoModal: {
        fontSize: 13,
        color: colors.gray,
        marginBottom: 8,
    },
});