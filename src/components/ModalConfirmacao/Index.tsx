import React from "react";
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { styles } from "./styles";

interface Props {
    visivel: boolean;
    titulo: string;
    mensagem: string;
    labelConfirmar?: string;
    labelCancelar?: string;
    perigoso?: boolean; // botão confirmar fica vermelho
    onConfirmar: () => void;
    onCancelar: () => void;
}

// modal de confirmação — usado antes de ações destrutivas ou importantes.
// tocar fora do card (na área escura) fecha, igual tocar em "Cancelar".
export default function ModalConfirmacao({
    visivel,
    titulo,
    mensagem,
    labelConfirmar = "Confirmar",
    labelCancelar = "Cancelar",
    perigoso = false,
    onConfirmar,
    onCancelar,
}: Props) {
    return (
        <Modal visible={visivel} transparent animationType="fade" onRequestClose={onCancelar}>
            <TouchableWithoutFeedback onPress={onCancelar}>
                <View style={styles.fundo}>
                    <TouchableWithoutFeedback onPress={() => {}}>
                        <View style={styles.card}>
                            <Text style={styles.titulo}>{titulo}</Text>
                            <Text style={styles.mensagem}>{mensagem}</Text>

                            <View style={styles.containerBotoes}>
                                <TouchableOpacity style={styles.botaoCancelar} onPress={onCancelar}>
                                    <Text style={styles.textoBotaoCancelar}>{labelCancelar}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.botaoConfirmar, perigoso && styles.botaoConfirmarPerigoso]}
                                    onPress={onConfirmar}
                                >
                                    <Text style={[styles.textoBotaoConfirmar, perigoso && styles.textoBotaoConfirmarPerigoso]}>
                                        {labelConfirmar}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}