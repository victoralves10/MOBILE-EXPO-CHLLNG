import React, { useState, useCallback } from "react";
import {
    View,
    Text,
    FlatList,
    Alert,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import CustomTextInput from "../../components/CustomTextInput/Index";
import PacienteCard from "../../components/PacienteCard/Index";
import { pacienteController } from "../../controllers/pacienteController";
import { Animal } from "../../models/Animal";
import { Responsavel } from "../../models/Responsavel";

// tipagem que junta o animal com o responsável dele
interface PacienteComDados {
    animal: Animal;
    responsavel: Responsavel;
}

export default function Paciente() {
    const navigation = useNavigation<any>();

    // lista de pacientes que aparece na tela
    const [pacientes, setPacientes] = useState<PacienteComDados[]>([]);

    // texto digitado na busca
    const [busca, setBusca] = useState("");

    // toda vez que o usuário voltar pra essa tela, recarrega os pacientes
    useFocusEffect(
        useCallback(() => {
            carregarPacientes();
        }, [])
    );

    async function carregarPacientes() {
        const animais = await pacienteController.buscarTodosAnimais();
        const comDados: PacienteComDados[] = [];

        // para cada animal busca o responsável vinculado
        for (const animal of animais) {
            const responsavel = await pacienteController.buscarResponsavelPorId(
                animal.id_responsavel
            );
            if (responsavel) {
                comDados.push({ animal, responsavel });
            }
        }

        setPacientes(comDados);
    }

    // filtra por nome do animal ou nome do responsável
    const pacientesFiltrados = pacientes.filter(({ animal, responsavel }) =>
        animal.nm_animal.toLowerCase().includes(busca.toLowerCase()) ||
        responsavel.nm_responsavel.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <View style={styles.container}>

            {/* barra de busca no topo */}
            <View style={styles.containerBusca}>
                <CustomTextInput
                    placeholder="Buscar por animal ou responsável..."
                    rightIconName="search"
                    value={busca}
                    onChangeText={setBusca}
                    containerStyle={{ marginBottom: 0 }}
                />
            </View>

            {/* lista de cards de paciente */}
            <View style={styles.containerLista}>
                <FlatList
                    data={pacientesFiltrados}
                    keyExtractor={({ animal }) => animal.id_animal}
                    renderItem={({ item }) => (
                        <PacienteCard
                            animal={item.animal}
                            responsavel={item.responsavel}
                            // clicou no card — vai pra ficha completa do paciente
                            onPress={() =>
                                navigation.navigate("DetalhePaciente", {
                                    id_animal: item.animal.id_animal,
                                })
                            }
                            // clicou no ícone do whatsapp — simula abertura da conversa
                            onPressIcone={() =>
                                Alert.alert(
                                    "WhatsApp",
                                    `Abrindo conversa com ${item.responsavel.nm_responsavel} pelo WhatsApp.`
                                )
                            }
                        />
                    )}
                    ListEmptyComponent={
                        <Text style={styles.textoVazio}>
                            Nenhum paciente encontrado.{"\n"}Crie uma consulta para cadastrar um paciente.
                        </Text>
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            </View>

        </View>
    );
}