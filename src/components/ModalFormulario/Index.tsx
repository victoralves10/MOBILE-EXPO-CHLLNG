import React, { ReactNode } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import { colors } from "../../global/colors";

interface Props {
    visivel: boolean;
    titulo: string;
    onFechar: () => void;
    onSalvar: () => void;
    carregando?: boolean;
    labelSalvar?: string;
    children: ReactNode;
}

// modal de formulário genérico — sobe do fundo da tela, com barra de
// arrasto, teclado nunca cobre os campos, e clicar fora ou no fundo fecha
export default function ModalFormulario({
    visivel,
    titulo,
    onFechar,
    onSalvar,
    carregando = false,
    labelSalvar = "Salvar",
    children,
}: Props) {
    return (
        <Modal visible={visivel} transparent animationType="slide" onRequestClose={onFechar}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                {/* toca fora do card (na área escura) pra fechar */}
                <TouchableWithoutFeedback onPress={onFechar}>
                    <View style={styles.fundo}>
                        {/* toca dentro do card não deve fechar — TouchableWithoutFeedback
                            aqui "absorve" o toque antes de ele chegar no fundo */}
                        <TouchableWithoutFeedback onPress={() => {}}>
                            <View style={styles.card}>
                                {/* barra de arrasto — só visual, indica que dá pra "puxar" */}
                                <View style={styles.barraArrasto} />

                                <ScrollView
                                    contentContainerStyle={styles.scrollConteudo}
                                    keyboardShouldPersistTaps="handled"
                                    showsVerticalScrollIndicator={false}
                                >
                                    <Text style={styles.titulo}>{titulo}</Text>

                                    {children}

                                    <View style={styles.containerBotoes}>
                                        <TouchableOpacity style={styles.botaoCancelar} onPress={onFechar}>
                                            <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            style={[styles.botaoSalvar, carregando && { opacity: 0.7 }]}
                                            onPress={onSalvar}
                                            disabled={carregando}
                                        >
                                            {carregando
                                                ? <ActivityIndicator color={colors.white} />
                                                : <Text style={styles.textoBotaoSalvar}>{labelSalvar}</Text>}
                                        </TouchableOpacity>
                                    </View>
                                </ScrollView>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    );
}