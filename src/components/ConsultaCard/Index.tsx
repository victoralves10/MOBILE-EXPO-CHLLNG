import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { colors } from "../../global/colors";
import { ConsultaCardProps } from "./types";

// retorna a cor de fundo e do texto dependendo do status da consulta
function getStatusEstilo(status: string) {
    switch (status) {
        case "Concluido":
            return { bg: colors.success + "20", texto: colors.success };
        case "Atrasado":
            return { bg: colors.danger + "20", texto: colors.danger };
        default:
            return { bg: colors.bluePrimary + "20", texto: colors.bluePrimary };
    }
}

export default function ConsultaCard({
    consulta,
    animal,
    onPress,
    onPressIcone,
}: ConsultaCardProps) {

    // calcula o estilo do badge de status antes de renderizar
    const statusEstilo = getStatusEstilo(consulta.st_consulta);

    return (
        // card inteiro clicável, vai pros detalhes da consulta
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>

            {/* lado esquerdo com as informações da consulta */}
            <View style={styles.containerInfo}>
                <Text style={styles.textoNomeAnimal}>{animal.nm_animal}</Text>
                <Text style={styles.textoEspecie}>{animal.especie_animal} • {animal.raca_animal}</Text>
                <Text style={styles.textoConsulta}>{consulta.historico_consulta}</Text>
                <Text style={styles.textoHorario}>{consulta.dt_consulta} às {consulta.hr_consulta}</Text>

                {/* badge colorido do status */}
                <View style={[styles.containerStatus, { backgroundColor: statusEstilo.bg }]}>
                    <Text style={[styles.textoStatus, { color: statusEstilo.texto }]}>
                        {consulta.st_consulta}
                    </Text>
                </View>
            </View>

            {/* ícone de câmera no lado direito, abre a consulta online ""*/}
            <TouchableOpacity style={styles.containerIcone} onPress={onPressIcone}>
                <Ionicons name="videocam-outline" size={22} color={colors.bluePrimary} />
            </TouchableOpacity>

        </TouchableOpacity>
    );
}