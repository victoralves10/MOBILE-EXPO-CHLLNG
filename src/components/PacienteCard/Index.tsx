import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { PacienteCardProps } from "./types";

export default function PacienteCard({
    animal,
    responsavel,
    onPress,
    onPressIcone,
}: PacienteCardProps) {
    return (
        // card inteiro clicável, vai pra ficha completa do paciente
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>

            {/* lado esquerdo com as informações do animal e do responsável */}
            <View style={styles.containerInfo}>
                <Text style={styles.textoNomeAnimal}>{animal.nm_animal}</Text>
                <Text style={styles.textoEspecie}>{animal.especie_animal} • {animal.raca_animal}</Text>
                <Text style={styles.textoTutor}>Tutor: {responsavel.nm_responsavel}</Text>
                <Text style={styles.textoWhatsApp}>{responsavel.nr_telefone_responsavel}</Text>
            </View>

            {/* ícone do whatsapp no lado direito, abre conversa com o responsável */}
            <TouchableOpacity style={styles.containerIcone} onPress={onPressIcone}>
                <Ionicons name="logo-whatsapp" size={22} color="#25D366" />
            </TouchableOpacity>

        </TouchableOpacity>
    );
}