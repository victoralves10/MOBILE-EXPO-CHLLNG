import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { criarEstilos } from "./styles";
import { useEstilos } from "../../theme/useEstilos";
import { useTema } from "../../theme/TemaContext";

interface Opcao<T> {
    valor: T;
    rotulo: string;
}

interface Props<T> {
    titulo: string;
    opcoes: Opcao<T>[];
    selecionado: T | null;
    onSelecionar: (valor: T | null) => void;
}

// lista de etiquetas pra escolher uma opção (tocar de novo desmarca)
export default function SeletorOpcoes<T extends string | number>({ titulo, opcoes, selecionado, onSelecionar }: Props<T>) {
    const styles = useEstilos(criarEstilos);
    const { cores } = useTema();

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>{titulo}</Text>
            <View style={styles.linha}>
                {opcoes.map((opcao) => {
                    const ativa = opcao.valor === selecionado;
                    return (
                        <TouchableOpacity
                            key={String(opcao.valor)}
                            style={[styles.etiqueta, ativa && styles.etiquetaAtiva]}
                            onPress={() => onSelecionar(ativa ? null : opcao.valor)}
                        >
                            {ativa && <Ionicons name="checkmark" size={14} color={cores.textoSobreCor} />}
                            <Text style={[styles.texto, ativa && styles.textoAtivo]}>{opcao.rotulo}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}
