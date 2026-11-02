import { StyleSheet } from "react-native";
import { Cores } from "../../theme/paletas";

export const criarEstilos = (c: Cores) =>
    StyleSheet.create({
        fundo: {
            flex: 1,
            backgroundColor: c.fundoModal,
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
        },

        areaFora: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },

        card: {
            backgroundColor: c.superficie,
            borderRadius: 24,
            padding: 24,
            width: "100%",
            alignItems: "center",
        },

        circuloIcone: {
            width: 64,
            height: 64,
            borderRadius: 32,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 14,
        },

        titulo: {
            fontSize: 19,
            fontWeight: "800",
            color: c.texto,
            textAlign: "center",
        },

        mensagem: {
            fontSize: 14,
            color: c.textoSecundario,
            lineHeight: 20,
            textAlign: "center",
            marginTop: 8,
        },

        containerBotoes: {
            flexDirection: "row",
            gap: 12,
            marginTop: 22,
            width: "100%",
        },

        botaoCancelar: {
            flex: 1,
            paddingVertical: 14,
            borderRadius: 14,
            alignItems: "center",
            backgroundColor: c.superficieAlt,
        },

        textoBotaoCancelar: {
            fontSize: 15,
            fontWeight: "700",
            color: c.texto,
        },

        botaoConfirmar: {
            flex: 1,
            paddingVertical: 14,
            borderRadius: 14,
            alignItems: "center",
        },

        textoBotaoConfirmar: {
            fontSize: 15,
            fontWeight: "800",
            color: c.textoSobreCor,
        },
    });
