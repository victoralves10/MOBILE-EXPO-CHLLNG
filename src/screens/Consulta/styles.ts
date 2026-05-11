import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({

    // Tela principal
    telaPrincipal: {
        flex: 1,
        backgroundColor: colors.grayLight,
    },

    // Área da barra de busca
    areaBusca: {
        paddingHorizontal: 16,
        paddingTop: 16,
    },

    // Fundo escuro do modal
    modalFundo: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },

    // Conteúdo do modal
    modalConteudo: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 24,
        maxHeight: "90%",
    },

    // Título do modal
    modalTitulo: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.dark,
        marginBottom: 16,
        textAlign: "center",
    },

    // Subtítulo de cada seção do modal
    modalSubtitulo: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.gray,
        marginTop: 16,
        marginBottom: 8,
    },

    // Área dos botões de status
    areaStatus: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },

    // Botão de cada status
    botaoStatus: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: colors.grayLight,
    },

    // Texto do status
    textoStatus: {
        fontSize: 13,
        color: colors.dark,
    },

    // Texto do status selecionado
    textoStatusAtivo: {
        color: colors.white,
        fontWeight: "bold",
    },

    // Área dos botões de ação do modal
    areaAcoes: {
        flexDirection: "row",
        gap: 12,
        marginTop: 20,
    },

    // Botão limpar filtros
    botaoLimpar: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
        borderWidth: 1.5,
        borderColor: colors.bluePrimary,
    },

    // Texto do botão limpar
    textoBotaoLimpar: {
        color: colors.bluePrimary,
        fontWeight: "bold",
        fontSize: 16,
    },

    // Botão aplicar filtros
    botaoAplicar: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
        backgroundColor: colors.bluePrimary,
    },

    // Texto do botão aplicar
    textoBotaoAplicar: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: 16,
    },

    // Card de cada consulta na lista
    cardConsulta: {
        backgroundColor: colors.white,
        marginHorizontal: 16,
        marginTop: 12,
        padding: 16,
        borderRadius: 12,
        elevation: 2,
    },

    // Badge colorido do status
    badgeStatus: {
        alignSelf: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        marginBottom: 8,
    },

    // Texto do badge de status
    textoBadgeStatus: {
        color: colors.white,
        fontSize: 12,
        fontWeight: "bold",
    },

    // Data e hora da consulta
    textoDataHora: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 6,
    },

    // Nome do animal
    textoNomeAnimal: {
        fontSize: 15,
        fontWeight: "bold",
        color: colors.gray,
        marginBottom: 4,
    },

    // Nome do tutor
    textoNomeTutor: {
        fontSize: 14,
        
        color: colors.gray,
    },

    // Botão flutuante de adicionar
    botaoAdicionar: {
        position: "absolute",
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.bluePrimary,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },

    // Texto do botão flutuante
    textoBotaoAdicionar: {
        color: colors.white,
        fontSize: 32,
        fontWeight: "bold",
        lineHeight: 36,
    },

    // ÍCONE LINK NO CARD
    iconeLink: {
    position: "absolute",
    bottom: 16,
    //top: 0,
    right: 12,
    width: 80,
    height: 80,
    borderRadius: 16,
    //backgroundColor: colors.grayLight,
    justifyContent: "center",
    alignItems: "center",
    },
    
});