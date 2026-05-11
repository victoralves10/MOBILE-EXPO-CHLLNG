import { StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../global/colors';

export default StyleSheet.create({
    
    container: {
        marginBottom: 16,
        width: '100%',
    } as ViewStyle,

    title: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.dark,
        marginBottom: 8,
    } as TextStyle,

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.grayLight,
        paddingHorizontal: 16,
        height: 52,
    } as ViewStyle,

    input: {
        flex: 1,
        fontSize: 16,
        color: colors.dark,
        paddingVertical: 0,
    } as ViewStyle,

    inputWithLeftIcon: {
        marginLeft: 8,
    } as ViewStyle,

    leftIcon: {
        marginRight: 8,
    } as ViewStyle,

    rightIconContainer: {
        marginLeft: 8,
    } as ViewStyle,

    rightIconButton: {
        padding: 4,
    } as ViewStyle,
});