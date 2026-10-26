import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

const TAMANHO_AVATAR = 50;

export const styles = StyleSheet.create({
    // linha da lista, estilo lista de contatos
    linha: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: colors.white,
    },

    // versão card, usada no carrossel da Home
    cartao: {
        borderRadius: 18,
        elevation: 3,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
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
        borderColor: colors.white,
    },

    // miolo com os textos
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
        color: colors.dark,
    },

    textoDireita: {
        fontSize: 12,
        color: colors.gray,
    },

    subtitulo: {
        flex: 1,
        fontSize: 14,
        color: colors.gray,
    },

    detalhe: {
        fontSize: 12,
        color: colors.textSecondary,
    },

    // etiqueta colorida do status
    selo: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
    },

    textoSelo: {
        fontSize: 11,
        fontWeight: "700",
    },

    // botão redondo da direita (câmera, WhatsApp...)
    botaoAcao: {
        width: 38,
        height: 38,
        borderRadius: 19,
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
        backgroundColor: colors.grayMedium,
    },
});