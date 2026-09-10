import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { colors } from "../../global/colors";
import { formatarData } from "../../utils/formatacao";
import { ConsultaCardProps } from "./types";

// cor + ícone dependendo do status da consulta
function getStatusInfo(status: string) {
    switch (status) {
        case "Concluido":
            return { cor: colors.success, icone: "checkmark-circle" as const };
        case "Atrasado":
            return { cor: colors.danger, icone: "alert-circle" as const };
        default:
            return { cor: colors.bluePrimary, icone: "time" as const };
    }
}

export default function ConsultaCard({
    consulta,
    animal,
    onPress,
    onPressIcone,
}: ConsultaCardProps) {

    const statusInfo = getStatusInfo(consulta.st_consulta);
    const inicialAnimal = animal.nm_animal.charAt(0).toUpperCase();

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>

            {/* linha colorida lateral, indica o status de relance */}
            <View style={[styles.linhaStatus, { backgroundColor: statusInfo.cor }]} />

            <View style={styles.containerConteudo}>

                {/* avatar circular com a inicial do animal */}
                <View style={[styles.avatar, { backgroundColor: statusInfo.cor + "18" }]}>
                    <Text style={[styles.textoAvatar, { color: statusInfo.cor }]}>{inicialAnimal}</Text>
                </View>

                <View style={styles.containerInfo}>
                    <Text style={styles.textoNomeAnimal} numberOfLines={1}>{animal.nm_animal}</Text>
                    <Text style={styles.textoEspecie} numberOfLines={1}>
                        {animal.especie_animal}{animal.raca_animal ? ` • ${animal.raca_animal}` : ""}
                    </Text>
                    <Text style={styles.textoConsulta} numberOfLines={1}>{consulta.historico_consulta}</Text>

                    <View style={styles.containerRodape}>
                        <View style={styles.containerHorario}>
                            <Ionicons name="calendar-outline" size={12} color={colors.gray} />
                            <Text style={styles.textoHorario}>{formatarData(consulta.dt_consulta)} • {consulta.hr_consulta}</Text>
                        </View>

                        <View style={[styles.badgeStatus, { backgroundColor: statusInfo.cor + "18" }]}>
                            <Ionicons name={statusInfo.icone} size={11} color={statusInfo.cor} />
                            <Text style={[styles.textoBadgeStatus, { color: statusInfo.cor }]}>
                                {consulta.st_consulta}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* ícone de câmera, abre a consulta online (simulação) */}
                <TouchableOpacity style={styles.botaoIcone} onPress={onPressIcone}>
                    <Ionicons name="videocam-outline" size={20} color={colors.bluePrimary} />
                </TouchableOpacity>

            </View>
        </TouchableOpacity>
    );
}