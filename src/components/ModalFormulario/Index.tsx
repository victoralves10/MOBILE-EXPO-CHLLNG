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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ToastTema from "../../theme/ToastTema";
import { criarEstilos } from "./styles";
import { useEstilos } from "../../theme/useEstilos";
import { useTema } from "../../theme/TemaContext";

interface Props {
    visivel: boolean;
    titulo: string;
    onFechar: () => void;
    onSalvar: () => void;
    carregando?: boolean;
    labelSalvar?: string;
    perigoso?: boolean; // botão salvar vermelho (ex: apagar conta)
    children: ReactNode;
}

// modal de formulário genérico: sobe do fundo da tela, com barra de arrasto,
// teclado nunca cobre os campos, e tocar fora fecha
export default function ModalFormulario({
    visivel,
    titulo,
    onFechar,
    onSalvar,
    carregando = false,
    labelSalvar = "Salvar",
    perigoso = false,
    children,
}: Props) {
    const styles = useEstilos(criarEstilos);
    const { cores } = useTema();

    return (
        <Modal visible={visivel} transparent animationType="slide" onRequestClose={onFechar}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
                <View style={styles.fundo}>
                    {/* área escura atrás do card: tocar nela fecha o modal.
                        fica do lado do card (e não em volta dele) pra não roubar o
                        toque do ScrollView, senão a lista não rola com o dedo */}
                    <Pressable style={styles.areaFora} onPress={onFechar} />

                    <View style={styles.card}>
                        {/* barra de arrasto, só visual */}
                        <View style={styles.barraArrasto} />

                        {/* título com o X pra fechar */}
                        <View style={styles.cabecalho}>
                            <Text style={styles.titulo}>{titulo}</Text>
                            <TouchableOpacity style={styles.botaoFechar} onPress={onFechar}>
                                <Ionicons name="close" size={20} color={cores.textoSecundario} />
                            </TouchableOpacity>
                        </View>

                        <ScrollView
                            contentContainerStyle={styles.scrollConteudo}
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                        >
                            {children}

                            <View style={styles.containerBotoes}>
                                <TouchableOpacity style={styles.botaoCancelar} onPress={onFechar}>
                                    <Text style={styles.textoBotaoCancelar}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.botaoSalvar,
                                        perigoso && { backgroundColor: cores.atrasado },
                                        carregando && { opacity: 0.7 },
                                    ]}
                                    onPress={onSalvar}
                                    disabled={carregando}
                                >
                                    {carregando ? (
                                        <ActivityIndicator color={cores.textoSobreCor} />
                                    ) : (
                                        <Text style={styles.textoBotaoSalvar}>{labelSalvar}</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </KeyboardAvoidingView>

            {/* o Modal fica por cima de tudo, até do Toast do App.tsx.
                com um Toast aqui dentro, as mensagens de erro aparecem por cima do formulário */}
            <ToastTema />
        </Modal>
    );
}
