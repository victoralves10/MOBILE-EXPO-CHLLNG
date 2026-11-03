import { StyleSheet } from "react-native";
import { Cores, transparente } from "../../theme/paletas";

export const criarEstilos = (c: Cores) =>
    StyleSheet.create({
        containerTela: {
            flex: 1,
            backgroundColor: c.fundo,
        },

        bolhaRoxa: {
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: 160,
            top: -120,
            right: -100,
            backgroundColor: transparente(c.primaria, 0.16),
        },

        bolhaVerde: {
            position: "absolute",
            width: 240,
            height: 240,
            borderRadius: 120,
            bottom: -80,
            left: -90,
            backgroundColor: transparente(c.secundaria, 0.14),
        },

        containerScroll: {
            flexGrow: 1,
            justifyContent: "center",
            paddingHorizontal: 22,
            paddingVertical: 32,
        },

        containerFormulario: {
            backgroundColor: c.superficie,
            borderRadius: 28,
            padding: 24,
            borderWidth: 1,
            borderColor: c.borda,
            elevation: 4,
            shadowColor: c.sombra,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.08,
            shadowRadius: 20,
        },

        containerTextos: {
            marginBottom: 22,
        },

        textoTitulo: {
            fontSize: 26,
            fontWeight: "800",
            color: c.texto,
        },

        textoSubtitulo: {
            fontSize: 15,
            color: c.textoSecundario,
            marginTop: 4,
        },

        containerInputs: {
            marginBottom: 8,
        },

        botaoEsqueceuSenha: {
            alignSelf: "flex-end",
            marginTop: -6,
            marginBottom: 14,
        },

        textoEsqueceuSenha: {
            fontSize: 13,
            fontWeight: "700",
            color: c.primaria,
        },

        botaoCadastro: {
            marginTop: 20,
            alignItems: "center",
        },

        textoCadastro: {
            fontSize: 14,
            color: c.textoSecundario,
        },

        textoCadastroDestaque: {
            fontWeight: "800",
            color: c.primaria,
        },
    });
