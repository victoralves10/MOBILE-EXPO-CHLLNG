import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style";
import { colors } from "../../global/colors";
import ConsultaCard from "../../components/ConsultaCard/Index";
import TelaCarregando from "../../components/TelaCarregando/Index";
import { useHome } from "../../hooks/useHome";

// tela inicial: carrossel com as próximas consultas e o destaque embaixo
export default function Home() {
    const { proximas, carregando, abrirDetalheConsulta } = useHome();

    return (
        <View style={styles.container}>

            {/* parte de cima, carrossel horizontal com as consultas agendadas */}
            <View style={styles.containerCarrossel}>
                <View style={styles.containerTitulo}>
                    <Text style={styles.tituloSecao}>Próximas Consultas</Text>
                    {proximas.length > 0 && (
                        <View style={styles.badgeContador}>
                            <Text style={styles.textoBadgeContador}>{proximas.length}</Text>
                        </View>
                    )}
                </View>

                {carregando ? (
                    <TelaCarregando />
                ) : proximas.length === 0 ? (
                    <View style={styles.containerVazio}>
                        <Ionicons name="calendar-outline" size={28} color={colors.grayMedium} />
                        <Text style={styles.textoVazioCarrossel}>Nenhuma consulta agendada no momento.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={proximas}
                        keyExtractor={(item) => String(item.id_consulta)}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.flatListCarrossel}
                        renderItem={({ item }) => (
                            <View style={styles.cardCarrossel}>
                                <ConsultaCard
                                    consulta={item}
                                    variante="cartao"
                                    onPress={() => abrirDetalheConsulta(item.id_consulta)}
                                />
                            </View>
                        )}
                    />
                )}
            </View>

            {/* parte de baixo, imagem do controle sanitário */}
            <View style={styles.containerDestaque}>
                <Text style={styles.tituloDestaque}>Destaque</Text>
                <Image
                    source={require("../../../assets/controle-sanitario.png")}
                    style={styles.imagemDestaque}
                    resizeMode="cover"
                />
            </View>

        </View>
    );
}