import React, { ReactNode } from "react";
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Pressable,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import Toast from "react-native-toast-message";
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
                <View style={styles.fundo}>
                    {/* área escura atrás do card: tocar nela fecha o modal.
                        fica do lado do card (e não em volta dele) pra não roubar o
                        toque do ScrollView, senão a lista não rola com o dedo */}
                    <Pressable style={StyleSheet.absoluteFill} onPress={onFechar} />

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
                </View>
            </KeyboardAvoidingView>

            {/* o Modal fica por cima de tudo, até do Toast do App.tsx.
                com um Toast aqui dentro, as mensagens de erro aparecem por cima do formulário */}
            <Toast />
        </Modal>
    );
}