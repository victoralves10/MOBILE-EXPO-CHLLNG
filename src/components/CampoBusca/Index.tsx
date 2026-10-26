import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import CustomTextInput from "../CustomTextInput/Index";
import ItemLista from "../ItemLista/Index";
import { colors } from "../../global/colors";
import { styles } from "./styles";

// um resultado da busca, já do jeito que vai aparecer
export interface ResultadoBusca {
    id: number;
    inicial: string;
    titulo: string;
    subtitulo: string;
}

interface Props {
    titulo: string;
    placeholder: string;
    busca: string;
    onChangeBusca: (texto: string) => void;
    resultados: ResultadoBusca[];
    carregando: boolean;
    selecionado: ResultadoBusca | null;
    onSelecionar: (id: number) => void;
    onTrocar: () => void;
}

// campo de busca com a lista de resultados embaixo; escolheu um, mostra ele com o botão "Trocar"
export default function CampoBusca({
    titulo,
    placeholder,
    busca,
    onChangeBusca,
    resultados,
    carregando,
    selecionado,
    onSelecionar,
    onTrocar,
}: Props) {
    // já escolheu: mostra o escolhido e a opção de trocar
    if (selecionado) {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>{titulo}</Text>
                <View style={styles.escolhido}>
                    <View style={styles.escolhidoTextos}>
                        <Text style={styles.escolhidoTitulo}>{selecionado.titulo}</Text>
                        <Text style={styles.escolhidoSubtitulo}>{selecionado.subtitulo}</Text>
                    </View>
                    <TouchableOpacity onPress={onTrocar}>
                        <Text style={styles.trocar}>Trocar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    // ainda não escolheu: campo de busca + resultados
    return (
        <View style={styles.container}>
            <CustomTextInput
                title={titulo}
                placeholder={placeholder}
                leftIconName="search"
                value={busca}
                onChangeText={onChangeBusca}
                containerStyle={{ marginBottom: 8 }}
            />

            {carregando && <ActivityIndicator color={colors.bluePrimary} style={{ marginVertical: 8 }} />}

            {!carregando && busca.trim() !== "" && resultados.length === 0 && (
                <Text style={styles.vazio}>Nenhum resultado.</Text>
            )}

            <View style={styles.resultados}>
                {resultados.map((item) => (
                    <ItemLista
                        key={item.id}
                        inicial={item.inicial}
                        cor={colors.bluePrimary}
                        titulo={item.titulo}
                        subtitulo={item.subtitulo}
                        onPress={() => onSelecionar(item.id)}
                    />
                ))}
            </View>
        </View>
    );
}
