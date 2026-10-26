import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { ItemListaProps } from "./types";

// item de lista no estilo lista de contatos do WhatsApp
// é a base visual dos cards de consulta e de paciente, assim o app fica com um padrão só
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
    return (
        <TouchableOpacity
            style={[styles.linha, variante === "cartao" && styles.cartao]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            {/* bolinha com a inicial e o pontinho de status */}
            <View style={[styles.avatar, { backgroundColor: cor + "1A" }]}>
                <Text style={[styles.textoAvatar, { color: cor }]}>{inicial}</Text>
                <View style={[styles.ponto, { backgroundColor: cor }]} />
            </View>

            {/* textos: título e data em cima, subtítulo e selo embaixo */}
            <View style={styles.conteudo}>
                <View style={styles.linhaTexto}>
                    <Text style={styles.titulo} numberOfLines={1}>{titulo}</Text>
                    {textoDireita && <Text style={styles.textoDireita}>{textoDireita}</Text>}
                </View>

                {(subtitulo || selo) && (
                    <View style={styles.linhaTexto}>
                        <Text style={styles.subtitulo} numberOfLines={1}>{subtitulo}</Text>
                        {selo && (
                            <View style={[styles.selo, { backgroundColor: cor + "1A" }]}>
                                <Text style={[styles.textoSelo, { color: cor }]}>{selo}</Text>
                            </View>
                        )}
                    </View>
                )}

                {detalhe && <Text style={styles.detalhe} numberOfLines={1}>{detalhe}</Text>}
            </View>

            {/* botão da direita, se a tela mandou um */}
            {acao && (
                <TouchableOpacity
                    style={[styles.botaoAcao, { backgroundColor: acao.cor + "1A" }]}
                    onPress={acao.onPress}
                >
                    <Ionicons name={acao.icone} size={20} color={acao.cor} />
                </TouchableOpacity>
            )}

            {/* divisória só aparece na versão lista */}
            {variante === "lista" && <View style={styles.divisoria} />}
        </TouchableOpacity>
    );
}