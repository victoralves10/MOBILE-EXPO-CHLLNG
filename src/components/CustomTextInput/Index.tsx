import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { criarEstilos } from "./styles";
import { useEstilos } from "../../theme/useEstilos";
import { useTema } from "../../theme/TemaContext";
import type { CustomTextInputProps } from "./types";

// campo de texto do app: título em cima, ícones opcionais e borda colorida quando está em foco
const CustomTextInput: React.FC<CustomTextInputProps> = ({
    title,
    placeholder = "",
    leftIconName,
    rightIconName,
    leftIconColor,
    rightIconColor,
    titleStyle,
    containerStyle,
    onRightIconPress,
    rightIconType = "decoration",
    style,
    onFocus,
    onBlur,
    ...inputProps // pega todas as outras props do TextInput (value, onChangeText, etc)
}) => {
    const styles = useEstilos(criarEstilos);
    const { cores, escuro } = useTema();

    // guarda se o campo está selecionado, pra pintar a borda
    const [focado, setFocado] = useState(false);

    return (
        <View style={[styles.container, containerStyle]}>
            {/* título acima do input, só aparece se for passado */}
            {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}

            <View style={[styles.inputContainer, focado && styles.inputFocado]}>
                {/* ícone da esquerda */}
                {leftIconName && (
                    <Ionicons
                        name={leftIconName as any}
                        size={20}
                        color={leftIconColor ?? (focado ? cores.primaria : cores.textoSuave)}
                        style={styles.leftIcon}
                    />
                )}

                <TextInput
                    style={[styles.input, style]}
                    placeholder={placeholder}
                    placeholderTextColor={cores.textoSuave}
                    keyboardAppearance={escuro ? "dark" : "light"}
                    selectionColor={cores.primaria}
                    onFocus={(e) => {
                        setFocado(true);
                        onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setFocado(false);
                        onBlur?.(e);
                    }}
                    {...inputProps}
                />

                {/* ícone da direita: pode ser só enfeite ou um botão (ex: olho da senha) */}
                {rightIconName && (
                    <TouchableOpacity
                        onPress={rightIconType === "button" ? onRightIconPress : undefined}
                        disabled={rightIconType !== "button"}
                        style={styles.rightIconContainer}
                        activeOpacity={0.7}
                    >
                        <Ionicons name={rightIconName as any} size={20} color={rightIconColor ?? cores.textoSuave} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default CustomTextInput;
