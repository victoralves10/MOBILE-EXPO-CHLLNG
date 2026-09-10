import React from "react";
import { View, Text, FlatList } from "react-native";
import { styles } from "./styles";
import CustomTextInput from "../../components/CustomTextInput/Index";
import PacienteCard from "../../components/PacienteCard/Index";
import TelaCarregando from "../../components/TelaCarregando/Index";
import { usePacientes } from "../../hooks/usePacientes";
import { toastAviso } from "../../utils/toast";

export default function Paciente() {
    const {
        busca,
        setBusca,
        carregando,
        pacientesFiltrados,
        abrirDetalhePaciente,
    } = usePacientes();

    return (
        <View style={styles.container}>

            {/* barra de busca no topo */}
            <View style={styles.containerBusca}>
                <CustomTextInput
                    placeholder="Buscar por animal ou responsável..."
                    leftIconName="search"
                    value={busca}
                    onChangeText={setBusca}
                    containerStyle={{ marginBottom: 0 }}
                />
            </View>

            {/* lista de cards de paciente */}
            <View style={styles.containerLista}>
                {carregando ? (
                    <TelaCarregando telaCheia />
                ) : (
                    <FlatList
                        data={pacientesFiltrados}
                        keyExtractor={({ animal }) => String(animal.id_animal)}
                        renderItem={({ item }) => (
                            <PacienteCard
                                animal={item.animal}
                                responsavel={item.responsavel}
                                onPress={() => abrirDetalhePaciente(item.animal.id_animal)}
                                onPressIcone={() =>
                                    toastAviso(`Abrindo conversa com ${item.responsavel.nm_responsavel} pelo WhatsApp.`)
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
                )}
            </View>

        </View>
    );
}