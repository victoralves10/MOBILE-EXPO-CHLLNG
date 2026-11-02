import { StyleSheet } from "react-native";
import { Cores, transparente } from "../../theme/paletas";

export const criarEstilos = (c: Cores) =>
    StyleSheet.create({
        container: {
            marginHorizontal: 16,
            gap: 12,
        },

        // ---------- mapa ----------

        // borda arredondada: o mapa fica "recortado" dentro dessa caixa
        caixaMapa: {
            height: 280,
            borderRadius: 24,
            overflow: "hidden",
            backgroundColor: c.superficieAlt,
            borderWidth: 1,
            borderColor: c.borda,
        },

        mapa: {
            flex: 1,
        },

        // bolinha colorida com o número de consultas
        bolha: {
            minWidth: 30,
            height: 30,
            paddingHorizontal: 6,
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 2,
            borderColor: "#FFFFFF",
        },

        bolhaAtiva: {
            minWidth: 38,
            height: 38,
            borderRadius: 19,
            borderWidth: 3,
        },

        textoBolha: {
            fontSize: 13,
            fontWeight: "900",
            color: c.textoSobreCor,
        },

        botoesFlutuantes: {
            position: "absolute",
            top: 12,
            right: 12,
            gap: 8,
        },

        botaoFlutuante: {
            width: 40,
            height: 40,
            borderRadius: 14,
            backgroundColor: c.superficie,
            alignItems: "center",
            justifyContent: "center",
            elevation: 4,
            shadowColor: c.sombra,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 6,
        },

        avisoVazio: {
            position: "absolute",
            left: 12,
            right: 12,
            bottom: 12,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            padding: 12,
            borderRadius: 16,
            backgroundColor: c.superficie,
        },

        textoAvisoVazio: {
            flex: 1,
            fontSize: 13,
            color: c.textoSecundario,
        },

        // ---------- legenda ----------

        legenda: {
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 14,
            paddingHorizontal: 4,
        },

        itemLegenda: {
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
        },

        pontoLegenda: {
            width: 10,
            height: 10,
            borderRadius: 5,
        },

        textoLegenda: {
            fontSize: 12,
            fontWeight: "700",
            color: c.textoSecundario,
        },

        // ---------- cartão da região ----------

        cartaoRegiao: {
            backgroundColor: c.superficie,
            borderRadius: 22,
            padding: 16,
            gap: 10,
            borderWidth: 1,
            borderColor: c.borda,
        },

        cabecalhoRegiao: {
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
        },

        iconeRegiao: {
            width: 42,
            height: 42,
            borderRadius: 14,
            alignItems: "center",
            justifyContent: "center",
        },

        nomeRegiao: {
            fontSize: 17,
            fontWeight: "800",
            color: c.texto,
        },

        resumoRegiao: {
            fontSize: 13,
            color: c.textoSecundario,
            marginTop: 1,
        },

        seloNivel: {
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 12,
        },

        textoSeloNivel: {
            fontSize: 12,
            fontWeight: "800",
        },

        linhaDetalhe: {
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            backgroundColor: transparente(c.superficieAlt, 0.7),
            borderRadius: 12,
            paddingHorizontal: 12,
            paddingVertical: 9,
        },

        textoDetalhe: {
            flex: 1,
            fontSize: 14,
            fontWeight: "600",
            color: c.texto,
        },

        textoRodape: {
            fontSize: 12,
            color: c.textoSuave,
            lineHeight: 17,
        },
    });
