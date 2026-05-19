import { StyleSheet } from 'react-native';
import { colors } from '../../global/colors';

export default StyleSheet.create({

    // espaço externo do input com largura total
    container: {
        marginBottom: 16,
        width: '100%',
    },

    // título acima do campo
    title: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.dark,
        marginBottom: 8,
    },

    // linha branca com borda que envolve ícone + input + ícone
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.grayLight,
        paddingHorizontal: 16,
        height: 52,
    },

    // campo de texto ocupa todo o espaço disponível
    input: {
        flex: 1,
        fontSize: 16,
        color: colors.dark,
        paddingVertical: 0,
    },

    // margem extra quando tem ícone à esquerda
    inputWithLeftIcon: {
        marginLeft: 8,
    },

    // ícone da esquerda com espaço à direita
    leftIcon: {
        marginRight: 8,
    },

    // container do ícone direito
    rightIconContainer: {
        marginLeft: 8,
    },

    // padding extra quando o ícone direito é um botão clicável
    rightIconButton: {
        padding: 4,
    },
});