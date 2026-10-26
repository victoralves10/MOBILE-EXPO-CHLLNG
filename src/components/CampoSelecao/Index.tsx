import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../global/colors";
import { styles } from "./styles";

interface Props {
    titulo: string;
    texto: string; // o que já foi escolhido
    placeholder: string;
    icone: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
}

// campo com a mesma cara do CustomTextInput, mas que abre um seletor em vez do teclado
export default function CampoSelecao({ titulo, texto, placeholder, icone, onPress }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{titulo}</Text>
            <TouchableOpacity style={styles.campo} onPress={onPress} activeOpacity={0.7}>
                <Ionicons name={icone} size={20} color={colors.gray} />
                <Text style={[styles.texto, !texto && styles.placeholder]}>{texto || placeholder}</Text>
                <Ionicons name="chevron-down" size={18} color={colors.gray} />
            </TouchableOpacity>
        </View>
    );
}
