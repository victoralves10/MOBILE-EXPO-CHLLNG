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
    perigoso?: boolean;
    children: ReactNode;
}

// modal de formulário
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
                    {/* fundo: tocar fecha */}
                    <Pressable style={styles.areaFora} onPress={onFechar} />

                    <View style={styles.card}>
                        {/* barra de arrasto */}
                        <View style={styles.barraArrasto} />

                        {/* título */}
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

            {/* toast por cima do modal */}
            <ToastTema />
        </Modal>
    );
}
