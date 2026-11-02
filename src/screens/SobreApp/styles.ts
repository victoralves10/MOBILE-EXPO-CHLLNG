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

        // ---------- topo ----------

        hero: {
            borderRadius: 28,
            alignItems: "center",
            paddingVertical: 28,
            paddingHorizontal: 20,
        },

        // quadrado branco com a patinha
        logo: {
            width: 76,
            height: 76,
            borderRadius: 24,
            backgroundColor: "#FFFFFF",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 14,
            elevation: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.2,
            shadowRadius: 12,
        },

        nomeApp: {
            fontSize: 28,
            fontWeight: "900",
            color: c.textoSobreCor,
        },

        slogan: {
            fontSize: 14,
            color: transparente("#FFFFFF", 0.85),
            marginTop: 2,
        },

        // pílula com versão e commit
        seloVersao: {
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginTop: 16,
            paddingHorizontal: 14,
            paddingVertical: 7,
            borderRadius: 20,
            backgroundColor: transparente("#FFFFFF", 0.2),
        },

        textoSelo: {
            fontSize: 13,
            fontWeight: "800",
            color: c.textoSobreCor,
        },

        // título cinza em cima de cada grupo
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

        cartao: {
            backgroundColor: c.superficie,
            borderRadius: 22,
            padding: 16,
            gap: 14,
            borderWidth: 1,
            borderColor: c.borda,
        },

        // ---------- projeto ----------

        texto: {
            fontSize: 14,
            lineHeight: 21,
            color: c.textoSecundario,
        },

        linhaParceria: {
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            backgroundColor: transparente(c.primaria, 0.1),
            borderRadius: 12,
            padding: 10,
        },

        textoParceria: {
            flex: 1,
            fontSize: 13,
            fontWeight: "700",
            color: c.primaria,
        },

        // ---------- equipe ----------

        linhaPessoa: {
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
        },

        avatar: {
            width: 42,
            height: 42,
            borderRadius: 21,
            alignItems: "center",
            justifyContent: "center",
        },

        inicial: {
            fontSize: 18,
            fontWeight: "900",
        },

        nomePessoa: {
            fontSize: 15,
            fontWeight: "700",
            color: c.texto,
        },

        rmPessoa: {
            fontSize: 13,
            color: c.textoSuave,
            marginTop: 1,
        },

        // ---------- tecnologias ----------

        gradeChips: {
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 8,
        },

        chip: {
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 14,
            backgroundColor: c.superficie,
            borderWidth: 1,
            borderColor: c.borda,
        },

        textoChip: {
            fontSize: 13,
            fontWeight: "700",
            color: c.texto,
        },

        rodape: {
            textAlign: "center",
            fontSize: 12,
            color: c.textoSuave,
            marginTop: 28,
        },
    });
