import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({

    // ──────────────────────── COMPARTILHADO ────────────────────────

    // tela inteira com fundo cinza
    container: {
        flex: 1,
        backgroundColor: colors.grayLight,
    },

    // quando os dados ainda não chegaram
    containerVazio: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    // texto de "Carregando..." ou "Nenhum resultado"
    textoVazio: {
        textAlign: "center",
        color: colors.gray,
        fontSize: 15,
        marginTop: 40,
    },

    // card branco de cada seção (Animal, Responsável, Histórico)
    secao: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        gap: 12,
    },

    // título de cada seção
    tituloSecao: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.dark,
        marginBottom: 4,
    },

    // linha com ícone + texto
    linha: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    // texto ao lado do ícone em cada linha
    textoLinha: {
        fontSize: 14,
        color: colors.dark,
        flex: 1,
    },

    // fundo escuro do modal
    modalOverlay: {
        flex: 1,
        backgroundColor: "#00000060",
        justifyContent: "flex-end",
    },

    // caixa branca do modal que sobe de baixo
    modalContainer: {
        backgroundColor: colors.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 24,
        maxHeight: "90%",
    },

    // título do modal
    modalTitulo: {
        fontSize: 20,
        fontWeight: "700",
        color: colors.dark,
        marginBottom: 20,
    },

    // botões lado a lado do modal
    containerBotoesModal: {
        flexDirection: "row",
        gap: 12,
        marginTop: 8,
    },

    // botão cinza de cancelar
    botaoCancelar: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.grayMedium,
        alignItems: "center",
    },

    textoBotaoCancelar: {
        color: colors.gray,
        fontWeight: "600",
        fontSize: 15,
    },

    // botão azul de salvar
    botaoSalvar: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: colors.bluePrimary,
        alignItems: "center",
    },

    textoBotaoSalvar: {
        color: colors.white,
        fontWeight: "600",
        fontSize: 15,
    },

    // ──────────────────────── INDEX (lista de pacientes) ────────────────────────

    // barra de busca no topo com fundo branco e borda embaixo
    containerBusca: {
        backgroundColor: colors.white,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.grayLight,
    },

    // área onde a flatlist de pacientes fica
    containerLista: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },

    // ──────────────────────── DETALHE PACIENTE ────────────────────────

    // scroll com padding interno
    scroll: {
        padding: 16,
        paddingBottom: 40,
    },

    // botão verde do whatsapp
    botaoWhatsApp: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        backgroundColor: "#25D366",
        paddingVertical: 12,
        borderRadius: 12,
        marginTop: 4,
    },

    textoBotaoWhatsApp: {
        color: colors.white,
        fontWeight: "700",
        fontSize: 15,
    },

    // mensagem quando não tem consultas no histórico
    textoSemConsulta: {
        color: colors.gray,
        fontSize: 14,
        textAlign: "center",
        paddingVertical: 8,
    },

    // card cinza de cada consulta no histórico (clicável)
    cardConsulta: {
        backgroundColor: colors.grayLight,
        borderRadius: 12,
        padding: 12,
        gap: 6,
    },

    // linha com motivo da consulta + badge de status
    linhaConsulta: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
    },

    textoConsultaMotivo: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.dark,
        flex: 1,
    },

    textoConsultaData: {
        fontSize: 12,
        color: colors.gray,
    },

    // "Ver detalhes >" no final de cada card de consulta
    linhaVerDetalhes: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginTop: 2,
    },

    textoVerDetalhes: {
        fontSize: 12,
        color: colors.bluePrimary,
        fontWeight: "600",
    },

    // badge colorido do status da consulta
    tagStatus: {
        paddingHorizontal: 10,
        paddingVertical: 3,
        borderRadius: 20,
    },

    textoStatus: {
        fontSize: 11,
        fontWeight: "600",
    },

    // botões de editar e remover no final da tela
    containerBotoes: {
        flexDirection: "row",
        gap: 12,
        marginTop: 8,
    },

    botaoEditar: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        backgroundColor: colors.bluePrimary,
        paddingVertical: 14,
        borderRadius: 12,
    },

    botaoRemover: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        backgroundColor: colors.danger,
        paddingVertical: 14,
        borderRadius: 12,
    },

    textoBotao: {
        color: colors.white,
        fontWeight: "700",
        fontSize: 15,
    },
});