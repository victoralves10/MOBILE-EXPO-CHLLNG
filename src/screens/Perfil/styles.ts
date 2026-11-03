import { StyleSheet } from "react-native";
import { Cores, transparente } from "../../theme/paletas";

export const criarEstilos = (c: Cores) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: c.fundo,
        },

        scroll: {
            padding: 16,
            paddingBottom: 40,
        },

        // ---------- cabeçalho ----------

        cabecalho: {
            backgroundColor: c.superficie,
            borderRadius: 28,
            alignItems: "center",
            paddingBottom: 22,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: c.borda,
        },

        faixa: {
            alignSelf: "stretch",
            height: 86,
        },

        avatar: {
            width: 96,
            height: 96,
            borderRadius: 48,
            backgroundColor: c.primaria,
            alignItems: "center",
            justifyContent: "center",
            marginTop: -48,
            marginBottom: 12,
            borderWidth: 4,
            borderColor: c.superficie,
        },

        textoAvatar: {
            fontSize: 38,
            fontWeight: "900",
            color: c.textoSobreCor,
        },

        nome: {
            fontSize: 23,
            fontWeight: "900",
            color: c.texto,
        },

        email: {
            fontSize: 14,
            color: c.textoSecundario,
            marginTop: 2,
        },

        botaoEditarPerfil: {
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginTop: 14,
            paddingHorizontal: 18,
            paddingVertical: 9,
            borderRadius: 20,
            backgroundColor: transparente(c.primaria, 0.12),
        },

        textoEditarPerfil: {
            fontSize: 14,
            fontWeight: "800",
            color: c.primaria,
        },

        tituloGrupo: {
            fontSize: 13,
            fontWeight: "800",
            color: c.textoSuave,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginTop: 26,
            marginBottom: 10,
            marginLeft: 4,
        },

        // ---------- indicadores ----------

        aviso: {
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            backgroundColor: transparente(c.atrasado, 0.12),
            borderRadius: 18,
            padding: 14,
            marginBottom: 12,
        },

        textoAviso: {
            flex: 1,
            fontSize: 14,
            fontWeight: "700",
            color: c.atrasado,
        },

        gradeIndicadores: {
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 12,
        },

        indicador: {
            width: "47%",
            flexGrow: 1,
            backgroundColor: c.superficie,
            borderRadius: 22,
            padding: 16,
            borderWidth: 1,
            borderColor: c.borda,
        },

        iconeIndicador: {
            width: 40,
            height: 40,
            borderRadius: 13,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 12,
        },

        numeroIndicador: {
            fontSize: 28,
            fontWeight: "900",
            color: c.texto,
        },

        rotuloIndicador: {
            fontSize: 13,
            color: c.textoSecundario,
            marginTop: 2,
        },

        cartaoRetorno: {
            backgroundColor: c.superficie,
            borderRadius: 22,
            padding: 18,
            marginTop: 12,
            borderWidth: 1,
            borderColor: c.borda,
        },

        linhaRetorno: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
        },

        tituloComIcone: {
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
        },

        tituloRetorno: {
            fontSize: 15,
            fontWeight: "800",
            color: c.texto,
        },

        valorRetorno: {
            fontSize: 20,
            fontWeight: "900",
            color: c.secundaria,
        },

        trilhaBarra: {
            height: 10,
            borderRadius: 5,
            backgroundColor: c.superficieAlt,
            overflow: "hidden",
        },

        barra: {
            height: 10,
            borderRadius: 5,
        },

        descricaoRetorno: {
            fontSize: 13,
            color: c.textoSecundario,
            marginTop: 10,
        },

        rodape: {
            textAlign: "center",
            fontSize: 12,
            color: c.textoSuave,
            marginTop: 28,
        },

        // ---------- menu do canto ----------

        botaoMenu: {
            width: 40,
            height: 40,
            borderRadius: 14,
            backgroundColor: c.superficie,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 16,
        },

        fundoMenu: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },

        caixaMenu: {
            position: "absolute",
            top: 6,
            right: 14,
            width: 230,
            backgroundColor: c.superficie,
            borderRadius: 20,
            paddingVertical: 8,
            borderWidth: 1,
            borderColor: c.borda,
            elevation: 10,
            shadowColor: c.sombra,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.18,
            shadowRadius: 16,
        },

        itemMenu: {
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            paddingVertical: 10,
            paddingHorizontal: 14,
        },

        iconeItemMenu: {
            width: 32,
            height: 32,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
        },

        textoItemMenu: {
            fontSize: 15,
            fontWeight: "700",
            color: c.texto,
        },

        // ---------- modal de aparência ----------

        fundoAparencia: {
            flex: 1,
            backgroundColor: c.fundoModal,
            justifyContent: "center",
            padding: 20,
        },

        cardAparencia: {
            backgroundColor: c.superficie,
            borderRadius: 26,
            padding: 20,
            gap: 10,
        },

        cabecalhoAparencia: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 6,
        },

        tituloAparencia: {
            fontSize: 20,
            fontWeight: "900",
            color: c.texto,
        },

        botaoFechar: {
            width: 34,
            height: 34,
            borderRadius: 17,
            backgroundColor: c.superficieAlt,
            alignItems: "center",
            justifyContent: "center",
        },

        opcaoTema: {
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            padding: 14,
            borderRadius: 18,
            borderWidth: 1.5,
            borderColor: c.borda,
        },

        iconeTema: {
            width: 44,
            height: 44,
            borderRadius: 14,
            alignItems: "center",
            justifyContent: "center",
        },

        tituloTema: {
            fontSize: 16,
            fontWeight: "800",
            color: c.texto,
        },

        descricaoTema: {
            fontSize: 13,
            color: c.textoSecundario,
            marginTop: 1,
        },

        botaoTeste: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            backgroundColor: c.primaria,
            paddingVertical: 14,
            borderRadius: 16,
            marginTop: 4,
        },

        textoBotaoTeste: {
            fontSize: 15,
            fontWeight: "800",
            color: c.textoSobreCor,
        },

        // ---------- caixinhas dos modais ----------

        caixaDica: {
            flexDirection: "row",
            gap: 10,
            backgroundColor: transparente(c.ceu, 0.12),
            borderRadius: 14,
            padding: 12,
            marginBottom: 16,
        },

        textoDica: {
            flex: 1,
            fontSize: 13,
            color: c.texto,
            lineHeight: 19,
        },

        caixaPerigo: {
            flexDirection: "row",
            gap: 10,
            backgroundColor: transparente(c.atrasado, 0.12),
            borderRadius: 14,
            padding: 12,
            marginBottom: 16,
        },

        textoPerigo: {
            flex: 1,
            fontSize: 14,
            color: c.atrasado,
            lineHeight: 20,
            fontWeight: "600",
        },
    });
