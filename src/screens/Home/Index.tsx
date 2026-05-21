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
import { consultaController } from "../../controllers/consultaController";
import { pacienteController } from "../../controllers/pacienteController";
import { Consulta } from "../../models/Consulta";
import { Animal } from "../../models/Animal";

// tipando para juntar consulta com dados do animal da consulta
interface ConsultaComDados {
    consulta: Consulta;
    animal: Animal;
}

export default function Home() {
    const navigation = useNavigation<any>();

    // lista da consutlas q vai mostrar no carrossel
    const [consultas, setConsultas] = useState<ConsultaComDados[]>([]);

    // sempre q o user ir pra tela tela de home vai recarregar as consultas
    useFocusEffect(
        useCallback(() => {
            carregarConsultas();
        }, [])
    );

    async function carregarConsultas() {

        // busca todas as consultas salvas
        const todas = await consultaController.buscarTodas();
        const comDados: ConsultaComDados[] = [];

        // para cada consulta busca os dados do animal escolhido
        for (const consulta of todas) {

            const animal = await pacienteController.buscarAnimalPorId(consulta.id_animal);

            if (animal) {

                comDados.push({ consulta, animal });

            }
        }
        
        // vai pegar só os 10 mais recentes e faz um reverse na ordem, mais novo sempre
        setConsultas(comDados.slice(-10).reverse());
    }

    return (
        <View style={styles.container}>

            {/* parte de cima, carrossel horizontal*/}
            <View style={styles.containerCarrossel}>
                <Text style={styles.tituloSecao}>Consultas Recentes</Text>

                {/* se n tiver consultas = "Nenhuma consulta registrada ainda.". se tiver mostra o carrosel */}
                {consultas.length === 0 ? (
                    <Text style={styles.textoVazioCarrossel}>
                        Nenhuma consulta registrada ainda.
                    </Text>
                ) : 
                
                (
                    <FlatList
                        data={consultas}
                        keyExtractor={({ consulta }) => consulta.id_consulta}
                        horizontal // é oq faz o flatlist virar um carrossel
                        showsHorizontalScrollIndicator={false} // n mostra a barra de scroll
                        contentContainerStyle={styles.flatListCarrossel}
                        renderItem={({ item }) => (

                            <View style={styles.cardCarrossel}>
                                <ConsultaCard

                                    consulta={item.consulta}
                                    animal={item.animal}
                                    onPress={() => // se clicar no card, vai prs detalhes da consulta
                                        navigation.navigate("DetalheConsulta", {
                                            id_consulta: item.consulta.id_consulta,
                                        })
                                    }

                                    
                                    onPressIcone={() =>
                                        Alert.alert(
                                            "Consulta Online",
                                            "Levando você para a consulta online."
                                        )
                                    }
                                />
                            </View>
                        )}
                    />
                )}
            </View>
            
            {/* parte de baixo, imagem do controle sanitario */}
            <View style={styles.containerDestaque}>
                <Text style={styles.tituloDestaque}>Destaque</Text>

                {/* imagem do controle sanitario */}
                <Image
                    source={require("../../../assets/controle-sanitario.png")}
                    style={styles.imagemDestaque}
                    resizeMode="cover"
                />
            </View>

        </View>
    );
}