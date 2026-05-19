import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { styles } from "./styles";
import CustomTextInput from "../../components/CustomTextInput/Index";
import ConsultaCard from "../../components/ConsultaCard/Index";
import { consultaController } from "../../controllers/consultaController";
import { pacienteController } from "../../controllers/pacienteController";
import { Consulta } from "../../models/Consulta";
import { Animal } from "../../models/Animal";

// tipagem que junta a consulta com os dados do animal dela
interface ConsultaComDados {
    consulta: Consulta;
    animal: Animal;
}

export default function ConsultaTela() {

    // lista de consultas com os dados do animal
    const [consultas, setConsultas] = useState<ConsultaComDados[]>([]);

    // texto digitado na busca
    const [busca, setBusca] = useState("");

    // toda vez que o usuário voltar pra essa tela, recarrega as consultas
    useFocusEffect(
        useCallback(() => {
            carregarConsultas();
        }, [])
    );

    async function carregarConsultas() {
        const todasConsultas = await consultaController.buscarTodas();
        const comDados: ConsultaComDados[] = [];

        // para cada consulta busca o animal vinculado
        for (const consulta of todasConsultas) {
            const animal = await pacienteController.buscarAnimalPorId(consulta.id_animal);
            if (animal) comDados.push({ consulta, animal });
        }

        setConsultas(comDados);
    }

    // filtra por nome do animal
    const consultasFiltradas = consultas.filter(({ animal }) =>
        animal.nm_animal.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <View style={styles.container}>

            {/* barra de busca no topo */}
            <View style={styles.containerBusca}>
                <CustomTextInput
                    placeholder="Buscar consulta..."
                    leftIconName="search"
                    value={busca}
                    onChangeText={setBusca}
                    containerStyle={{ marginBottom: 0 }}
                />
            </View>

            {/* lista de cards de consulta */}
            <View style={styles.containerLista}>
                <FlatList
                    data={consultasFiltradas}
                    keyExtractor={({ consulta }) => consulta.id_consulta}
                    renderItem={({ item }) => (
                        <ConsultaCard
                            consulta={item.consulta}
                            animal={item.animal}
                            // por enquanto só avisa
                            onPress={() =>
                                Alert.alert("Em breve", "Detalhes da consulta em desenvolvimento.")
                            }
                            onPressIcone={() =>
                                Alert.alert("Consulta Online", "Levando você para a consulta online.")
                            }
                        />
                    )}
                    ListEmptyComponent={
                        <Text style={styles.textoVazio}>Nenhuma consulta encontrada.</Text>
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            </View>

        </View>
    );
}