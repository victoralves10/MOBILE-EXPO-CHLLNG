import { StyleSheet } from "react-native";
import { Cores } from "../../theme/paletas";

const TAMANHO_AVATAR = 50;

export const criarEstilos = (c: Cores) =>
    StyleSheet.create({
        // linha da lista, estilo lista de contatos
        linha: {
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 12,
            paddingHorizontal: 16,
            backgroundColor: c.superficie,
        },

        // versão card, usada no carrossel da Home
        cartao: {
            borderRadius: 20,
            borderWidth: 1,
            borderColor: c.borda,
            elevation: 3,
            shadowColor: c.sombra,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.08,
            shadowRadius: 10,
        },

        // bolinha com a inicial
        avatar: {
            width: TAMANHO_AVATAR,
            height: TAMANHO_AVATAR,
            borderRadius: TAMANHO_AVATAR / 2,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
        },

        textoAvatar: {
            fontSize: 20,
            fontWeight: "800",
        },

        // pontinho de status no canto da bolinha, tipo o "online" do WhatsApp
        ponto: {
            position: "absolute",
            right: 1,
            bottom: 1,
            width: 13,
            height: 13,
            borderRadius: 7,
            borderWidth: 2,
            borderColor: c.superficie,
        },

        conteudo: {
            flex: 1,
            gap: 3,
        },

        linhaTexto: {
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
        },

        titulo: {
            flex: 1,
            fontSize: 16,
            fontWeight: "700",
            color: c.texto,
        },

        textoDireita: {
            fontSize: 12,
            color: c.textoSecundario,
        },

        subtitulo: {
            flex: 1,
            fontSize: 14,
            color: c.textoSecundario,
        },

        detalhe: {
            fontSize: 12,
            color: c.textoSuave,
        },

        // etiqueta colorida do status
        selo: {
            paddingHorizontal: 9,
            paddingVertical: 3,
            borderRadius: 10,
        },

        textoSelo: {
            fontSize: 11,
            fontWeight: "800",
        },

        // botão redondo da direita (câmera, WhatsApp...)
        botaoAcao: {
            width: 40,
            height: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: 10,
        },

        // divisória fina que começa depois da bolinha, igual no WhatsApp
        divisoria: {
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 16 + TAMANHO_AVATAR + 12,
            height: StyleSheet.hairlineWidth,
            backgroundColor: c.borda,
        },
    });
