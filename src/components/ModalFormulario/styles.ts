import { StyleSheet } from "react-native";
import { Cores } from "../../theme/paletas";

export const criarEstilos = (c: Cores) =>
    StyleSheet.create({
        fundo: {
            flex: 1,
            backgroundColor: c.fundoModal,
            justifyContent: "flex-end",
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
            borderTopLeftRadius: 28,
            borderTopRightRadius: 28,
            maxHeight: "88%",
        },

        barraArrasto: {
            width: 44,
            height: 5,
            borderRadius: 3,
            backgroundColor: c.borda,
            alignSelf: "center",
            marginTop: 10,
        },

        cabecalho: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 24,
            paddingTop: 14,
            paddingBottom: 6,
        },

        titulo: {
            fontSize: 20,
            fontWeight: "800",
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

        scrollConteudo: {
            paddingHorizontal: 24,
            paddingTop: 12,
            paddingBottom: 32,
        },

        containerBotoes: {
            flexDirection: "row",
            gap: 12,
            marginTop: 12,
        },

        botaoCancelar: {
            flex: 1,
            paddingVertical: 15,
            borderRadius: 16,
            alignItems: "center",
            backgroundColor: c.superficieAlt,
        },

        textoBotaoCancelar: {
            fontSize: 15,
            fontWeight: "700",
            color: c.texto,
        },

        botaoSalvar: {
            flex: 1,
            paddingVertical: 15,
            borderRadius: 16,
            alignItems: "center",
            backgroundColor: c.primaria,
        },

        textoBotaoSalvar: {
            fontSize: 15,
            fontWeight: "800",
            color: c.textoSobreCor,
        },
    });
