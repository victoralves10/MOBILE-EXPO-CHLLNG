import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

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
                            <Text style={[styles.texto, ativa && styles.textoAtivo]}>{opcao.rotulo}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}
