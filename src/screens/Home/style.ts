import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../global/colors";

// pega a largura total da tela — usada para calcular o tamanho do card do carrossel
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({

    // tela inteira — fundo cinza claro
    container: {
        flex: 1,
        backgroundColor: colors.grayLight,
    },

    // bloco de cima — fundo branco com borda embaixo separando do destaque
    containerCarrossel: {
        backgroundColor: colors.white,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.grayLight,
    },

    // título "Consultas Recentes" e "Destaque"
    tituloSecao: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.dark,
        paddingHorizontal: 16,
        marginBottom: 12,
    },

    // espaçamento interno do carrossel
    flatListCarrossel: {
        paddingHorizontal: 16,
    },

    // cada card ocupa 75% da largura — dá o efeito de "tem mais pra rolar"
    cardCarrossel: {
        width: width * 0.75,
        marginRight: 12,
    },

    // mensagem quando não tem consultas ainda
    textoVazioCarrossel: {
        color: colors.gray,
        fontSize: 14,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },

    // bloco de baixo — ocupa o restante da tela
    containerDestaque: {
        flex: 1,
        padding: 16,
    },

    // título "Destaque"
    tituloDestaque: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.dark,
        marginBottom: 12,
    },

    // imagem de destaque com bordas arredondadas
    imagemDestaque: {
        flex: 1,
        width: "100%",
        borderRadius: 16,
        overflow: "hidden",
    },
});