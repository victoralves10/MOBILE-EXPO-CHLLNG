import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../global/colors";

// pega a largura total da tela usada para calcular o tamanho do card do carrossel
const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({

    // tela inteira, fundo cinza claro
    container: {
        flex: 1,
        backgroundColor: colors.grayLight,
    },

    // parte de cima, fundo branco com borda embaixo separando do destaque
    containerCarrossel: {
        backgroundColor: colors.white,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.grayLight,
    },

    // titulo "Consultas Recentes" e "Destaque"
    tituloSecao: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.dark,
        paddingHorizontal: 16,
        marginBottom: 12,
    },

    // espaçamento de dentro do carrossel
    flatListCarrossel: {
        paddingHorizontal: 16,
    },

    // cada card do carrossel ocupa 75% da largura da tela, isso faz sentir q tem coisa pra rolar
    cardCarrossel: {
        width: width * 0.75,
        marginRight: 12,
    },

    // mensagem quando c tem consultas cadastradas ainda
    textoVazioCarrossel: {
        color: colors.gray,
        fontSize: 14,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },

    // part de baixo, ocupa o resto da tela com padding
    containerDestaque: {
        flex: 1,
        padding: 16,
    },

    // titulo "Destaque"
    tituloDestaque: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.dark,
        marginBottom: 12,
    },

    // imagem de destaque, ocupa todo o espaço reto com bordas arredondadas
    imagemDestaque: {
        flex: 1,
        width: "100%",
        borderRadius: 16,
        overflow: "hidden",
    },
});