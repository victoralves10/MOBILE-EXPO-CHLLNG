import { StyleSheet } from "react-native";
import { Cores, transparente } from "../../theme/paletas";

export const criarEstilos = (c: Cores) =>
    StyleSheet.create({
        container: {
            marginBottom: 16,
        },

        titulo: {
            fontSize: 13,
            fontWeight: "700",
            color: c.textoSecundario,
            marginBottom: 8,
            marginLeft: 2,
        },

        // resultados numa caixa com borda
        resultados: {
            borderRadius: 16,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: c.borda,
        },

        vazio: {
            fontSize: 13,
            color: c.textoSecundario,
            marginVertical: 8,
            marginLeft: 2,
        },

        // caixinha colorida com o item escolhido
        escolhido: {
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            backgroundColor: transparente(c.primaria, 0.1),
            borderWidth: 1.5,
            borderColor: transparente(c.primaria, 0.4),
            borderRadius: 16,
            padding: 14,
        },

        escolhidoTextos: {
            flex: 1,
        },

        escolhidoTitulo: {
            fontSize: 16,
            fontWeight: "800",
            color: c.texto,
        },

        escolhidoSubtitulo: {
            fontSize: 13,
            color: c.textoSecundario,
            marginTop: 2,
        },

        trocar: {
            fontSize: 14,
            fontWeight: "800",
            color: c.primaria,
        },
    });
