import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({

    // Container principal
    containerTela: {
        flex: 1,
        backgroundColor: colors.white,
    },

    // TOPO
    containerTopo: {
        flex: 3,
    },

    // Imagem
    imagemLogo: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    // FORMULÁRIO
    containerFormulario: {
        flex: 7,
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 30,
        backgroundColor: colors.white,

        justifyContent: "space-evenly",
    },

    // BLOCO DOS CAMPOS
    containerCampos: {
        gap: 20,
    },

    // BLOCO DOS BOTÕES/LINKS
    containerAcoes: {
        gap: 16,
    },

    // Título
    textoTitulo: {
        width: "100%",
        fontSize: 28,
        fontWeight: "bold",
        color: colors.blueDark,
        textAlign: "center",
    },

    // Container input
    containerInput: {
        width: "100%",
    },

    // Label
    textoLabel: {
        fontSize: 16,
        color: colors.blueDark,
        marginBottom: 6,
        fontWeight: "600",
    },

    // Input
    campoInput: {
        width: "100%",
        borderWidth: 1.5,
        borderColor: colors.grayLight,
        borderRadius: 8,
        padding: 18,
        fontSize: 16,
        color: colors.dark,
        backgroundColor: colors.white,
    },

    // Esqueci senha
    containerEsqueciSenha: {
        alignSelf: "flex-end",
        marginTop: -8,
    },

    // Botão login
    botaoEntrar: {
        width: "100%",
        backgroundColor: colors.bluePrimary,
        padding: 18,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20
    },

    // Texto botão
    textoBotao: {
        color: colors.white,
        fontSize: 16,
        fontWeight: "bold",
    },

    // Texto links
    textoLink: {
        fontSize: 14,
        color: colors.gray,
        textAlign: "center",
    },


});