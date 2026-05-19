import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import type { CustomTextInputProps } from './types';
import { colors } from '../../global/colors';

const CustomTextInput: React.FC<CustomTextInputProps> = ({
    title,
    placeholder = '',
    leftIconName,
    rightIconName,
    leftIconColor = '#666',
    rightIconColor = '#666',
    titleStyle,
    containerStyle,
    onRightIconPress,
    rightIconType = 'decoration',
    style,
    ...inputProps // pega todas as outras props do TextInput (value, onChangeText, etc)
}) => {

    return (

        // container externo,aceita estilo customizado por fora
        <View style={[styles.container, containerStyle]}>

            {/* título acima do input — só aparece se for passado */}
            {title && (<Text style={[styles.title, titleStyle]}>{title}</Text>)}

            {/* linha do input com ícone esquerdo, campo de texto e ícone direito */}
            <View style={styles.inputContainer}>

                {/* ícone esquerdo, só aparece se for passado */}
                {leftIconName && (
                    <Ionicons
                        name={leftIconName as any}
                        size={20}
                        color={leftIconColor}
                        style={styles.leftIcon}
                    />
                )}

                <TextInput
                    style={[
                        styles.input,
                        leftIconName && styles.inputWithLeftIcon, // adiciona margem se tiver ícone esquerdo
                        style
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor="#999"
                    {...inputProps}
                />

                {/* ícone direito, pode ser decorativo ou botão clicável */}
                {rightIconName && (
                    <TouchableOpacity
                        onPress={rightIconType === 'button' ? onRightIconPress : undefined}
                        style={[
                            styles.rightIconContainer,
                            rightIconType === 'button' && styles.rightIconButton
                        ]}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name={rightIconName as any}
                            size={20}
                            color={rightIconColor}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default CustomTextInput;