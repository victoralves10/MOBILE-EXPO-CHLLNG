import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../global/colors";
import { styles } from "./styles";

interface Props {
    icone: keyof typeof Ionicons.glyphMap;
    titulo: string;
    subtitulo?: string;
    perigo?: boolean; // deixa vermelho (sair, apagar conta)
    ultima?: boolean; // a última linha do grupo não tem divisória
    onPress: () => void;
}

// linha de menu no estilo das configurações do WhatsApp/iFood: ícone, texto e setinha
export default function LinhaMenu({ icone, titulo, subtitulo, perigo = false, ultima = false, onPress }: Props) {
    const cor = perigo ? colors.danger : colors.bluePrimary;

    return (
        <TouchableOpacity style={styles.linha} onPress={onPress} activeOpacity={0.6}>
            {/* quadradinho colorido com o ícone */}
            <View style={[styles.caixaIcone, { backgroundColor: cor + "1A" }]}>
                <Ionicons name={icone} size={20} color={cor} />
            </View>

            <View style={styles.textos}>
                <Text style={[styles.titulo, perigo && { color: colors.danger }]}>{titulo}</Text>
                {subtitulo && <Text style={styles.subtitulo}>{subtitulo}</Text>}
            </View>

            {!perigo && <Ionicons name="chevron-forward" size={18} color={colors.grayMedium} />}

            {!ultima && <View style={styles.divisoria} />}
        </TouchableOpacity>
    );
}
