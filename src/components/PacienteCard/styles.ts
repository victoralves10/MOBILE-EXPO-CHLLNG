import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({

    // card branco com sombra leve e bordas arredondadas
    card: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: "row",
        alignItems: "center",
        elevation: 2,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
    },

    // ocupa todo o espaço sobrando à esquerda do ícone
    containerInfo: {
        flex: 1,
    },

    // nome do animal em destaque
    textoNomeAnimal: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.dark,
    },

    // espécie e raça em cinza abaixo do nome
    textoEspecie: {
        fontSize: 13,
        color: colors.gray,
        marginTop: 2,
    },

    // nome do tutor responsável
    textoTutor: {
        fontSize: 13,
        color: colors.dark,
        marginTop: 6,
    },

    // número de telefone do responsável
    textoWhatsApp: {
        fontSize: 12,
        color: colors.gray,
        marginTop: 2,
    },

    // círculo verde claro do ícone do whatsapp no lado direito
    containerIcone: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#25D36620",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 12,
    },
});