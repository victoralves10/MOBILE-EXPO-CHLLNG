import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({

    // tela inteira com fundo cinza
    container: {
        flex: 1,
        backgroundColor: colors.grayLight,
    },

    // barra de busca no topo com fundo branco e borda embaixo
    containerBusca: {
        backgroundColor: colors.white,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.grayLight,
    },

    // área onde a flatlist de consultas fica
    containerLista: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },

    // mensagem quando não tem nenhuma consulta
    textoVazio: {
        textAlign: "center",
        color: colors.gray,
        fontSize: 15,
        marginTop: 40,
    },
});