import { StyleSheet, Dimensions } from "react-native";
import { Cores, transparente } from "../../theme/paletas";

const { width } = Dimensions.get("window");

export const criarEstilos = (c: Cores) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: c.fundo,
        },

        scroll: {
            paddingBottom: 32,
        },

        // ---------- saudação ----------

        saudacao: {
            margin: 16,
            borderRadius: 28,
            padding: 22,
            overflow: "hidden",
        },

        // bolhas translúcidas de enfeite dentro do card
        bolha1: {
            position: "absolute",
            width: 180,
            height: 180,
            borderRadius: 90,
            top: -60,
            right: -40,
            backgroundColor: transparente(c.textoSobreCor, 0.12),
        },

        bolha2: {
            position: "absolute",
            width: 120,
            height: 120,
            borderRadius: 60,
            bottom: -50,
            left: 40,
            backgroundColor: transparente(c.textoSobreCor, 0.08),
        },

        linhaSaudacao: {
            flexDirection: "row",
            alignItems: "center",
        },

        textoOla: {
            fontSize: 16,
            color: transparente(c.textoSobreCor, 0.85),
            fontWeight: "600",
        },

        textoNome: {
            fontSize: 26,
            fontWeight: "900",
            color: c.textoSobreCor,
        },

        circuloPata: {
            width: 52,
            height: 52,
            borderRadius: 26,
            backgroundColor: transparente(c.textoSobreCor, 0.2),
            alignItems: "center",
            justifyContent: "center",
        },

        textoResumo: {
            fontSize: 14,
            color: transparente(c.textoSobreCor, 0.9),
            marginTop: 14,
        },

        // ---------- atalhos ----------

        linhaAtalhos: {
            flexDirection: "row",
            gap: 12,
            paddingHorizontal: 16,
        },

        atalho: {
            flex: 1,
            backgroundColor: c.superficie,
            borderRadius: 20,
            paddingVertical: 16,
            alignItems: "center",
            gap: 8,
            borderWidth: 1,
            borderColor: c.borda,
        },

        iconeAtalho: {
            width: 48,
            height: 48,
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
        },

        textoAtalho: {
            fontSize: 12,
            fontWeight: "700",
            color: c.texto,
        },

        // ---------- seções ----------

        // título + bolinha com o contador
        containerTitulo: {
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            paddingHorizontal: 20,
            marginTop: 26,
            marginBottom: 12,
        },

        tituloSecao: {
            fontSize: 19,
            fontWeight: "800",
            color: c.texto,
        },

        badgeContador: {
            backgroundColor: c.primaria,
            borderRadius: 12,
            minWidth: 24,
            height: 24,
            paddingHorizontal: 7,
            alignItems: "center",
            justifyContent: "center",
        },

        textoBadgeContador: {
            color: c.textoSobreCor,
            fontSize: 12,
            fontWeight: "800",
        },

        flatListCarrossel: {
            paddingHorizontal: 16,
        },

        cardCarrossel: {
            width: width * 0.8,
            marginRight: 12,
        },

        containerVazio: {
            alignItems: "center",
            gap: 8,
            marginHorizontal: 16,
            paddingVertical: 28,
            backgroundColor: c.superficie,
            borderRadius: 20,
        },

        textoVazio: {
            fontSize: 14,
            color: c.textoSecundario,
        },

        // linha cinza embaixo do título do mapa
        subtituloSecao: {
            fontSize: 13,
            color: c.textoSecundario,
            paddingHorizontal: 20,
            marginTop: -6,
            marginBottom: 12,
        },
    });
