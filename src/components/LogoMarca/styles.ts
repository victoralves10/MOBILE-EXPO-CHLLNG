import { StyleSheet } from "react-native";
import { Cores } from "../../theme/paletas";

export const criarEstilos = (c: Cores) =>
    StyleSheet.create({
        // agrupa ícone + nome + subtítulo
        containerLogo: {
            alignItems: "center",
            marginBottom: 28,
            gap: 6,
        },

        // quadrado arredondado com degradê e sombra colorida
        circuloLogo: {
            width: 92,
            height: 92,
            borderRadius: 28,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 8,
            elevation: 10,
            shadowColor: c.primaria,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.4,
            shadowRadius: 16,
        },

        textoMarca: {
            fontSize: 32,
            fontWeight: "800",
            color: c.texto,
            letterSpacing: 0.5,
        },

        // "ELLV" na cor da marca
        textoMarcaDestaque: {
            fontWeight: "900",
            color: c.primaria,
        },

        textoMarcaSub: {
            fontSize: 11,
            color: c.textoSecundario,
            letterSpacing: 2.5,
            textTransform: "uppercase",
        },
    });
