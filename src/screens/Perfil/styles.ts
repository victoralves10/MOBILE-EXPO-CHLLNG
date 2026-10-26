import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.grayLight,
    },

    scroll: {
        padding: 16,
        paddingBottom: 40,
    },

    // ---------- cabeçalho ----------

    // card branco com avatar, nome e e-mail
    cabecalho: {
        backgroundColor: colors.white,
        borderRadius: 20,
        alignItems: "center",
        paddingVertical: 24,
        paddingHorizontal: 16,
    },

    avatar: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: colors.bluePrimary,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
    },

    textoAvatar: {
        fontSize: 36,
        fontWeight: "800",
        color: colors.white,
    },

    nome: {
        fontSize: 22,
        fontWeight: "800",
        color: colors.dark,
    },

    email: {
        fontSize: 14,
        color: colors.gray,
        marginTop: 2,
    },

    // botão pequeno com borda azul
    botaoEditarPerfil: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        marginTop: 14,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: colors.bluePrimary + "14",
    },

    textoEditarPerfil: {
        fontSize: 14,
        fontWeight: "700",
        color: colors.bluePrimary,
    },

    // ---------- grupos ----------

    // título cinza em cima de cada grupo, igual nas configurações do celular
    tituloGrupo: {
        fontSize: 13,
        fontWeight: "700",
        color: colors.gray,
        textTransform: "uppercase",
        letterSpacing: 0.8,
        marginTop: 24,
        marginBottom: 8,
        marginLeft: 4,
    },

    // ---------- indicadores ----------

    // aviso vermelho clicável das atrasadas
    aviso: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        backgroundColor: colors.danger + "14",
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
    },

    textoAviso: {
        flex: 1,
        fontSize: 14,
        fontWeight: "600",
        color: colors.danger,
    },

    // grade 2x2
    gradeIndicadores: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },

    indicador: {
        width: "47.5%",
        flexGrow: 1,
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 14,
    },

    iconeIndicador: {
        width: 34,
        height: 34,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },

    numeroIndicador: {
        fontSize: 26,
        fontWeight: "800",
        color: colors.dark,
    },

    rotuloIndicador: {
        fontSize: 13,
        color: colors.gray,
        marginTop: 2,
    },

    // card da taxa de retorno
    cartaoRetorno: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        marginTop: 12,
    },

    linhaRetorno: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },

    tituloRetorno: {
        fontSize: 15,
        fontWeight: "700",
        color: colors.dark,
    },

    valorRetorno: {
        fontSize: 18,
        fontWeight: "800",
        color: colors.bluePrimary,
    },

    // fundo cinza da barrinha
    trilhaBarra: {
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.grayLight,
        overflow: "hidden",
    },

    // parte azul da barrinha (largura = porcentagem que vem do backend)
    barra: {
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.bluePrimary,
    },

    descricaoRetorno: {
        fontSize: 13,
        color: colors.gray,
        marginTop: 10,
    },

    // ---------- modais e rodapé ----------

    textoModal: {
        fontSize: 13,
        color: colors.gray,
        marginBottom: 16,
    },

    textoModalPerigo: {
        fontSize: 14,
        color: colors.danger,
        backgroundColor: colors.danger + "14",
        borderRadius: 12,
        padding: 12,
        marginBottom: 16,
    },

    rodape: {
        textAlign: "center",
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: 24,
    },

    // ---------- menu do canto ----------

    botaoMenu: {
        paddingHorizontal: 16,
        paddingVertical: 4,
    },

    // área transparente que cobre a tela pra fechar o menu ao tocar fora
    fundoMenu: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    },

    // caixinha branca com sombra no canto de cima
    caixaMenu: {
        position: "absolute",
        top: 8,
        right: 12,
        width: 220,
        backgroundColor: colors.white,
        borderRadius: 14,
        paddingVertical: 6,
        elevation: 8,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
    },

    itemMenu: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
    },

    textoItemMenu: {
        fontSize: 15,
        fontWeight: "600",
        color: colors.dark,
    },
});