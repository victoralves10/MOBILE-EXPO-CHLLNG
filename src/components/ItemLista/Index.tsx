import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { criarEstilos } from "./styles";
import { useEstilos } from "../../theme/useEstilos";
import { transparente } from "../../theme/paletas";
import { ItemListaProps } from "./types";

// item de lista (base dos cards)
export default function ItemLista({
    inicial,
    cor,
    titulo,
    textoDireita,
    subtitulo,
    selo,
    detalhe,
    acao,
    variante = "lista",
    onPress,
}: ItemListaProps) {
    const styles = useEstilos(criarEstilos);

    return (
        <TouchableOpacity
            style={[styles.linha, variante === "cartao" && styles.cartao]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {/* avatar */}
            <View style={[styles.avatar, { backgroundColor: transparente(cor, 0.14) }]}>
                <Text style={[styles.textoAvatar, { color: cor }]}>{inicial}</Text>
                <View style={[styles.ponto, { backgroundColor: cor }]} />
            </View>

            {/* textos */}
            <View style={styles.conteudo}>
                <View style={styles.linhaTexto}>
                    <Text style={styles.titulo} numberOfLines={1}>{titulo}</Text>
                    {textoDireita && <Text style={styles.textoDireita}>{textoDireita}</Text>}
                </View>

                {(subtitulo || selo) && (
                    <View style={styles.linhaTexto}>
                        <Text style={styles.subtitulo} numberOfLines={1}>{subtitulo}</Text>
                        {selo && (
                            <View style={[styles.selo, { backgroundColor: transparente(cor, 0.14) }]}>
                                <Text style={[styles.textoSelo, { color: cor }]}>{selo}</Text>
                            </View>
                        )}
                    </View>
                )}

                {detalhe && <Text style={styles.detalhe} numberOfLines={1}>{detalhe}</Text>}
            </View>

            {/* botão da direita */}
            {acao && (
                <TouchableOpacity
                    style={[styles.botaoAcao, { backgroundColor: transparente(acao.cor, 0.14) }]}
                    onPress={acao.onPress}
                >
                    <Ionicons name={acao.icone} size={20} color={acao.cor} />
                </TouchableOpacity>
            )}

            {/* divisória */}
            {variante === "lista" && <View style={styles.divisoria} />}
        </TouchableOpacity>
    );
}
