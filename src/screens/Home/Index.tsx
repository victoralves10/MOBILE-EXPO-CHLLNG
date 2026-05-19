import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    Alert,
    Image,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { styles } from "./style";
import ConsultaCard from "../../components/ConsultaCard/Index";
import { Consulta } from "../../models/Consulta";
import { Animal } from "../../models/Animal";
import AsyncStorage from "@react-native-async-storage/async-storage";

// tipagem que junta a consulta com os dados do animal dela
interface ConsultaComDados {
    consulta: Consulta;
    animal: Animal;
}

export default function Home() {
    const navigation = useNavigation<any>();

    // lista de consultas que vai aparecer no carrossel
    const [consultas, setConsultas] = useState<ConsultaComDados[]>([]);

    // toda vez que o usuário voltar pra essa tela, recarrega as consultas
    useFocusEffect(
        useCallback(() => {
            carregarConsultas();
        }, [])
    );

    async function carregarConsultas() {

        // lê as consultas e animais direto do asyncstorage
        const dataConsultas = await AsyncStorage.getItem("@clyvovet:consultas");
        const dataAnimais = await AsyncStorage.getItem("@clyvovet:animais");

        const todasConsultas: Consulta[] = dataConsultas ? JSON.parse(dataConsultas) : [];
        const todosAnimais: Animal[] = dataAnimais ? JSON.parse(dataAnimais) : [];

        const comDados: ConsultaComDados[] = [];

        // para cada consulta busca o animal vinculado
        for (const consulta of todasConsultas) {
            const animal = todosAnimais.find(a => a.id_animal === consulta.id_animal);
            if (animal) {
                comDados.push({ consulta, animal });
            }
        }

        // pega só as 10 mais recentes e inverte a ordem (mais nova primeiro)
        setConsultas(comDados.slice(-10).reverse());
    }

    return (
        <View style={styles.container}>

            {/* bloco de cima — carrossel horizontal com as consultas recentes */}
            <View style={styles.containerCarrossel}>
                <Text style={styles.tituloSecao}>Consultas Recentes</Text>

                {/* se não tiver consultas mostra mensagem, se tiver mostra o carrossel */}
                {consultas.length === 0 ? (
                    <Text style={styles.textoVazioCarrossel}>
                        Nenhuma consulta registrada ainda.
                    </Text>
                ) : (
                    <FlatList
                        data={consultas}
                        keyExtractor={({ consulta }) => consulta.id_consulta}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.flatListCarrossel}
                        renderItem={({ item }) => (
                            <View style={styles.cardCarrossel}>
                                <ConsultaCard
                                    consulta={item.consulta}
                                    animal={item.animal}
                                    // clicou no card, por enquanto só avisa que vai navegar
                                    onPress={() =>
                                        Alert.alert("Em breve", "Detalhes da consulta em desenvolvimento.")
                                    }
                                    // clicou no ícone de câmera, simula consulta online
                                    onPressIcone={() =>
                                        Alert.alert("Consulta Online", "Levando você para a consulta online.")
                                    }
                                />
                            </View>
                        )}
                    />
                )}
            </View>

            {/* bloco de baixo, imagem de destaque */}
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