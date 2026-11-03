import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { criarEstilos } from "./styles";
import { useEstilos } from "../../theme/useEstilos";
import { useTema } from "../../theme/TemaContext";

interface Props {
    titulo: string;
    texto: string;
    placeholder: string;
    icone: keyof typeof Ionicons.glyphMap;
    aberto?: boolean;
    onPress: () => void;
}

// campo que abre um seletor
export default function CampoSelecao({ titulo, texto, placeholder, icone, aberto = false, onPress }: Props) {
    const styles = useEstilos(criarEstilos);
    const { cores } = useTema();

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{titulo}</Text>
            <TouchableOpacity style={[styles.campo, aberto && styles.campoAberto]} onPress={onPress} activeOpacity={0.7}>
                <Ionicons name={icone} size={20} color={texto || aberto ? cores.primaria : cores.textoSuave} />
                <Text style={[styles.texto, !texto && styles.placeholder]}>{texto || placeholder}</Text>
                <Ionicons name={aberto ? "chevron-up" : "chevron-down"} size={18} color={cores.textoSuave} />
            </TouchableOpacity>
        </View>
    );
}
