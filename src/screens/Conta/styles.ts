import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({

    // tela inteira com fundo cinza
    container: {
        flex: 1,
        backgroundColor: colors.grayLight,
    },

    // bloco branco do topo com avatar, nome e email
    containerHeader: {
        backgroundColor: colors.white,
        alignItems: "center",
        paddingVertical: 32,
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: colors.grayLight,
    },

    // círculo azul do avatar com a inicial do nome
    containerAvatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: colors.bluePrimary,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },

    // letra inicial dentro do avatar
    textoInicialAvatar: {
        fontSize: 36,
        fontWeight: "bold",
        color: colors.white,
    },

    // nome do usuário embaixo do avatar
    textoNome: {
        fontSize: 20,
        fontWeight: "700",
        color: colors.dark,
    },

    // email do usuário embaixo do nome
    textoEmail: {
        fontSize: 14,
        color: colors.gray,
        marginTop: 4,
    },

    // card branco do gráfico de desempenho
    containerGrafico: {
        backgroundColor: colors.white,
        marginTop: 24,
        marginHorizontal: 16,
        borderRadius: 16,
        padding: 16,
        elevation: 2,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },

    // título do card do gráfico
    tituloGrafico: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.dark,
        marginBottom: 16,
    },

    // centraliza o número grande de total de consultas
    containerTotalConsultas: {
        alignItems: "center",
        marginBottom: 8,
    },

    // número grande azul do total de consultas
    textoTotalNumero: {
        fontSize: 40,
        fontWeight: "800",
        color: colors.bluePrimary,
    },

    // "consultas no total" abaixo do número
    textoTotalLabel: {
        fontSize: 13,
        color: colors.gray,
        marginTop: 2,
    },

    // mensagem quando ainda não tem consultas cadastradas
    textoSemDados: {
        textAlign: "center",
        color: colors.gray,
        fontSize: 14,
        paddingVertical: 20,
    },

    // legenda manual abaixo do gráfico
    containerResumo: {
        marginTop: 8,
        gap: 8,
    },

    // linha da legenda com bolinha + texto
    itemResumo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },

    // bolinha colorida da legenda
    bolinha: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },

    // texto ao lado da bolinha
    textoItemResumo: {
        fontSize: 13,
        color: colors.dark,
    },

    // seção de menu (fundo branco com borda em cima e embaixo)
    containerSecao: {
        marginTop: 24,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: colors.grayLight,
    },

    // item individual do menu com ícone + texto + seta
    itemMenu: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderBottomWidth: 1,
        borderBottomColor: colors.grayLight,
    },

    // remove a borda embaixo do último item do menu
    itemMenuPerigo: {
        borderBottomWidth: 0,
    },

    // texto do item de menu
    textoItemMenu: {
        flex: 1,
        fontSize: 16,
        color: colors.dark,
        marginLeft: 16,
    },

    // texto do item de sair — vermelho
    textoItemMenuPerigo: {
        color: colors.danger,
    },

    // rodapé com a versão do app
    containerVersao: {
        alignItems: "center",
        marginTop: 32,
        marginBottom: 32,
    },

    // "ClyvoVet v1.0.0"
    textoVersao: {
        fontSize: 12,
        color: colors.grayMedium,
    },
});