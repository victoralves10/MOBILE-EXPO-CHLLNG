import React from "react";
import { View, Text, FlatList, Alert, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./style";
import { colors } from "../../global/colors";
import ConsultaCard from "../../components/ConsultaCard/Index";
import TelaCarregando from "../../components/TelaCarregando/Index";
import { useHome } from "../../hooks/useHome";

export default function Home() {
    const { agendadasComAnimal, carregando, abrirDetalheConsulta } = useHome();

    return (
        <View style={styles.container}>

            {/* parte de cima, carrossel horizontal com as consultas agendadas */}
            <View style={styles.containerCarrossel}>
                <View style={styles.containerTitulo}>
                    <Text style={styles.tituloSecao}>Próximas Consultas</Text>
                    {agendadasComAnimal.length > 0 && (
                        <View style={styles.badgeContador}>
                            <Text style={styles.textoBadgeContador}>{agendadasComAnimal.length}</Text>
                        </View>
                    )}
                </View>

                {carregando ? (
                    <TelaCarregando />
                ) : agendadasComAnimal.length === 0 ? (
                    <View style={styles.containerVazio}>
                        <Ionicons name="calendar-outline" size={28} color={colors.grayMedium} />
                        <Text style={styles.textoVazioCarrossel}>Nenhuma consulta agendada no momento.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={agendadasComAnimal}
                        keyExtractor={(item) => String(item.consulta.id_consulta)}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.flatListCarrossel}
                        renderItem={({ item }) => (
                            <View style={styles.cardCarrossel}>
                                <ConsultaCard
                                    consulta={item.consulta}
                                    animal={item.animal}
                                    onPress={() => abrirDetalheConsulta(item.consulta.id_consulta)}
                                    onPressIcone={() =>
                                        Alert.alert("Consulta Online", "Levando você para a consulta online.")
                                    }
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