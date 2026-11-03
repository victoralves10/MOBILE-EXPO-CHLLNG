import { StyleSheet } from "react-native";
import { Cores } from "../../theme/paletas";

export const criarEstilos = (c: Cores) =>
    StyleSheet.create({
        container: {
            marginHorizontal: 16,
            gap: 12,
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

        cartao: {
            backgroundColor: c.superficie,
            borderRadius: 22,
            padding: 16,
            gap: 12,
            borderWidth: 1.5,
            borderColor: c.borda,
        },

        cabecalho: {
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
        },

        icone: {
            width: 42,
            height: 42,
            borderRadius: 14,
            alignItems: "center",
            justifyContent: "center",
        },

        nome: {
            fontSize: 17,
            fontWeight: "800",
            color: c.texto,
        },

        resumo: {
            fontSize: 13,
            color: c.textoSecundario,
            marginTop: 1,
        },

        selo: {
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 12,
        },

        textoSelo: {
            fontSize: 12,
            fontWeight: "800",
        },

        trilha: {
            height: 8,
            borderRadius: 4,
            backgroundColor: c.superficieAlt,
            overflow: "hidden",
        },

        barra: {
            height: 8,
            borderRadius: 4,
        },

        doencaPrincipal: {
            fontSize: 13,
            fontWeight: "600",
            color: c.textoSecundario,
        },

        // ---------- detalhes ----------

        detalhes: {
            gap: 8,
        },

        linhaDetalhe: {
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            backgroundColor: c.superficieAlt,
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

        rodape: {
            fontSize: 12,
            color: c.textoSuave,
            lineHeight: 17,
        },

        seta: {
            alignSelf: "center",
            marginTop: -4,
        },

        // ---------- sem regiões ----------

        vazio: {
            alignItems: "center",
            gap: 8,
            marginHorizontal: 16,
            paddingVertical: 28,
            paddingHorizontal: 20,
            backgroundColor: c.superficie,
            borderRadius: 20,
        },

        textoVazio: {
            fontSize: 14,
            color: c.textoSecundario,
            textAlign: "center",
        },
    });
