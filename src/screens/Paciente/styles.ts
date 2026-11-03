import { StyleSheet } from "react-native";
import { Cores, transparente } from "../../theme/paletas";

export const criarEstilos = (c: Cores) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: c.fundo,
        },

        // ---------- lista ----------

        containerBusca: {
            paddingHorizontal: 16,
            paddingTop: 4,
            paddingBottom: 12,
        },

        containerLista: {
            flex: 1,
            paddingHorizontal: 16,
        },

        painelLista: {
            flex: 1,
            backgroundColor: c.superficie,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            overflow: "hidden",
        },

        containerVazio: {
            alignItems: "center",
            marginTop: 60,
            gap: 12,
        },

        circuloVazio: {
            width: 76,
            height: 76,
            borderRadius: 38,
            backgroundColor: transparente(c.pacientes, 0.14),
            alignItems: "center",
            justifyContent: "center",
        },

        textoVazio: {
            textAlign: "center",
            color: c.textoSecundario,
            fontSize: 15,
            lineHeight: 22,
            paddingHorizontal: 24,
        },

        // ---------- ficha ----------

        scroll: {
            padding: 16,
            paddingBottom: 40,
        },

        destaque: {
            backgroundColor: c.superficie,
            borderRadius: 28,
            padding: 20,
            alignItems: "center",
            borderWidth: 1,
            borderColor: c.borda,
        },

        avatarGrande: {
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: transparente(c.pacientes, 0.15),
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 10,
        },

        textoAvatarGrande: {
            fontSize: 34,
            fontWeight: "900",
            color: c.pacientes,
        },

        nomeDestaque: {
            fontSize: 24,
            fontWeight: "900",
            color: c.texto,
        },

        subtituloDestaque: {
            fontSize: 14,
            color: c.textoSecundario,
            marginTop: 2,
        },

        seloConsultas: {
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            paddingHorizontal: 14,
            paddingVertical: 6,
            borderRadius: 20,
            marginTop: 12,
            backgroundColor: transparente(c.primaria, 0.12),
        },

        textoSeloConsultas: {
            fontSize: 13,
            fontWeight: "800",
            color: c.primaria,
        },

        linhaAcoes: {
            flexDirection: "row",
            gap: 10,
            marginTop: 14,
        },

        secao: {
            backgroundColor: c.superficie,
            borderRadius: 24,
            padding: 18,
            marginTop: 14,
            gap: 14,
            borderWidth: 1,
            borderColor: c.borda,
        },

        tituloSecao: {
            fontSize: 17,
            fontWeight: "800",
            color: c.texto,
        },

        textoSemConsulta: {
            fontSize: 14,
            color: c.textoSecundario,
        },

        listaHistorico: {
            marginHorizontal: -18,
            marginBottom: -18,
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            overflow: "hidden",
        },

        containerBotoes: {
            flexDirection: "row",
            gap: 12,
            marginTop: 20,
        },

        botaoEditar: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            backgroundColor: c.primaria,
            paddingVertical: 15,
            borderRadius: 16,
        },

        textoBotaoEditar: {
            color: c.textoSobreCor,
            fontWeight: "800",
            fontSize: 15,
        },

        botaoRemover: {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            backgroundColor: transparente(c.atrasado, 0.12),
            paddingVertical: 15,
            borderRadius: 16,
        },

        textoBotaoRemover: {
            color: c.atrasado,
            fontWeight: "800",
            fontSize: 15,
        },

        // ---------- modal de edição ----------

        avisoModal: {
            flexDirection: "row",
            gap: 10,
            backgroundColor: transparente(c.aviso, 0.15),
            borderRadius: 14,
            padding: 12,
            marginBottom: 16,
        },

        textoAvisoModal: {
            flex: 1,
            fontSize: 13,
            color: c.texto,
            lineHeight: 19,
        },
    });
