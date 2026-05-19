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

    // card branco de cada seção
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

    // fundo escuro do modal de filtro
    modalFundo: {
        flex: 1,
        backgroundColor: "#00000060",
        justifyContent: "flex-end",
    },

    // fundo escuro do modal de nova consulta
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
        marginBottom: 16,
    },

    // botões lado a lado (cancelar + salvar / limpar + aplicar)
    containerBotoes: {
        flexDirection: "row",
        gap: 12,
        marginTop: 16,
    },

    // botão cinza de cancelar ou limpar
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

    // botão azul de salvar ou aplicar
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

    // seletor de status
    containerStatus: {
        marginBottom: 16,
    },

    // label acima do seletor de status
    labelStatus: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.dark,
        marginBottom: 8,
    },

    // linha dos botões de status
    containerOpcoes: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },

    // botão individual de status (inativo)
    opcaoStatus: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.grayMedium,
        alignItems: "center",
    },

    // botão de status quando está selecionado
    opcaoStatusAtiva: {
        borderColor: colors.bluePrimary,
        backgroundColor: colors.bluePrimary,
    },

    // texto do botão de status inativo
    textoOpcaoStatus: {
        fontSize: 13,
        color: colors.gray,
        fontWeight: "500",
    },

    // texto do botão de status ativo
    textoOpcaoStatusAtiva: {
        color: colors.white,
        fontWeight: "700",
    },

    // ──────────────────────── INDEX ────────────────────────

    // barra de busca no topo
    containerBusca: {
        backgroundColor: colors.white,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: colors.grayLight,
        gap: 8,
    },

    // tags dos filtros ativos abaixo da busca
    containerTagsFiltro: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
    },

    // tag individual de filtro ativo
    tagFiltroAtivo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: colors.bluePrimary,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },

    // texto dentro da tag de filtro
    textoTagFiltro: {
        color: colors.white,
        fontSize: 12,
        fontWeight: "600",
    },

    // área onde a flatlist de consultas fica
    containerLista: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },

    // botão "+" flutuante no canto inferior direito
    botaoAdicionar: {
        position: "absolute",
        bottom: 24,
        right: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.bluePrimary,
        alignItems: "center",
        justifyContent: "center",
        elevation: 5,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },

    // label acima do calendário e seletor de status no modal de filtro
    labelFiltro: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.dark,
        marginBottom: 8,
    },

    // calendário com borda arredondada
    calendario: {
        borderRadius: 12,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: colors.grayLight,
    },

    // ──────────────────────── DETALHE CONSULTA ────────────────────────

    // scroll com padding interno
    scroll: {
        padding: 16,
        paddingBottom: 40,
    },

    // badge colorido do status no topo da tela
    tagStatus: {
        alignSelf: "flex-start",
        paddingHorizontal: 14,
        paddingVertical: 5,
        borderRadius: 20,
        marginBottom: 16,
    },

    // texto do badge de status
    textoStatus: {
        fontSize: 13,
        fontWeight: "700",
    },

    // botão azul de iniciar consulta online
    botaoOnline: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        backgroundColor: colors.bluePrimary,
        paddingVertical: 12,
        borderRadius: 12,
        marginTop: 4,
    },

    textoBotaoOnline: {
        color: colors.white,
        fontWeight: "700",
        fontSize: 15,
    },

    // botão azul de editar
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

    // botão vermelho de remover
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

    // texto dos botões de editar e remover
    textoBotao: {
        color: colors.white,
        fontWeight: "700",
        fontSize: 15,
    },

    // botões lado a lado do modal de edição
    containerBotoesModal: {
        flexDirection: "row",
        gap: 12,
        marginTop: 8,
    },
});