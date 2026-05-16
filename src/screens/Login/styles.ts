import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../global/colors";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
    // Container principal - tela inteira
    containerTela: {
        flex: 1,
        backgroundColor: colors.white,
    },

    // View para garantir q o conteúdo ocupe 100% da are disponivel para dividir (4 e 6) sem bugs
    containerConteudo: {
        flex: 1,
    },

    // Container de cima - onde fica a imagem
    containerBanner: {
        flex: 4,
        width: "100%",
    },

    // Estilização da imagem no container de cima
    imagemBanner: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },

    // Container q fica por cima da imagem, arredondado nos cantos
    containerFormulario: {
        flex: 6,
        backgroundColor: colors.white,
        marginTop: -50,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 30,
        paddingTop: 40,
        paddingBottom: 20,
        justifyContent: "space-between",

        // Subindo e Sombra
        elevation: 15,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },

    // Centralizando o texto (Bem-vindo) e o subtitulo (Faça login para continuar)
    // e da espaço pra os inputs
    containerTextos: {
        alignItems: "center",
        marginBottom: 10,
    },

    // Titulo (Bem-vindo)
    textoTitulo: {
        fontSize: 32,
        fontWeight: "bold",
        color: colors.blueDark,
    },

    // Subtitulo (faça login para continuar)
    textoSubtitulo: {
        fontSize: 16,
        color: colors.gray,
        marginTop: 5,
    },

    // Espaços entre os inputs
    containerInputs: {
        gap: 15,
    },

    // Alinhamento do "Esqueceu sua senha?"
    botaoEsqueceuSenha: {
        alignSelf: "center", // ou flex-end
    },

    // Estilização do "Esqueceu sua senha?"
    textoEsqueceuSenha: {
        color: colors.gray,
        fontSize: 14,
    },

    // Agrupando botão de cadastro e botão entrar
    containerAcoes: {
        width: "100%",
        gap: 20,
        marginBottom: 10,
    },

    // Botão de login
    botaoEntrar: {
        backgroundColor: colors.bluePrimary,
        paddingVertical: 16,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
    },

    // Texto do botão de login
    textoBotaoEntrar: {
        color: colors.white,
        fontSize: 18,
        fontWeight: "bold",
    },

    // Botão de cadastro
    botaoCadastro: {
        alignItems: "center",
        paddingVertical: 10,
    },

    // Texto do botão de cadastro
    textoCadastro: {
        fontSize: 15,
        color: colors.gray,
    },

    // Texto colorido do cadastro
    textoCadastroDestaque: {
        color: colors.bluePrimary,
        fontWeight: "bold",
    },
});