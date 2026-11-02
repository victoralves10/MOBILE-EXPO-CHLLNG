import React from "react";
import { Modal, View, Text, TouchableOpacity, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { criarEstilos } from "./styles";
import { useEstilos } from "../../theme/useEstilos";
import { useTema } from "../../theme/TemaContext";
import { transparente } from "../../theme/paletas";

interface Props {
    visivel: boolean;
    titulo: string;
    mensagem: string;
    labelConfirmar?: string;
    labelCancelar?: string;
    perigoso?: boolean; // botão confirmar fica vermelho
    icone?: keyof typeof Ionicons.glyphMap;
    onConfirmar: () => void;
    onCancelar: () => void;
}

// modal de confirmação, usado antes de ações destrutivas ou importantes
// tocar fora do card (na área escura) fecha, igual tocar em "Cancelar"
export default function ModalConfirmacao({
    visivel,
    titulo,
    mensagem,
    labelConfirmar = "Confirmar",
    labelCancelar = "Cancelar",
    perigoso = false,
    icone,
    onConfirmar,
    onCancelar,
}: Props) {
    const styles = useEstilos(criarEstilos);
    const { cores } = useTema();
    const cor = perigoso ? cores.atrasado : cores.primaria;

    return (
        <Modal visible={visivel} transparent animationType="fade" onRequestClose={onCancelar}>
            <View style={styles.fundo}>
                {/* área escura: tocar nela cancela */}
                <Pressable style={styles.areaFora} onPress={onCancelar} />

                <View style={styles.card}>
                    {/* ícone grande no topo */}
                    <View style={[styles.circuloIcone, { backgroundColor: transparente(cor, 0.14) }]}>
                        <Ionicons name={icone ?? (perigoso ? "warning" : "help-circle")} size={30} color={cor} />
                    </View>

                    <Text style={styles.titulo}>{titulo}</Text>
                    <Text style={styles.mensagem}>{mensagem}</Text>

                    <View style={styles.containerBotoes}>
                        <TouchableOpacity style={styles.botaoCancelar} onPress={onCancelar}>
                            <Text style={styles.textoBotaoCancelar}>{labelCancelar}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.botaoConfirmar, { backgroundColor: cor }]} onPress={onConfirmar}>
                            <Text style={styles.textoBotaoConfirmar}>{labelConfirmar}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
