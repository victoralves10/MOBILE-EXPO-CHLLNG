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