import React from "react";
import { View, Text, FlatList } from "react-native";
import { styles } from "./styles";
import CustomTextInput from "../../components/CustomTextInput/Index";
import PacienteCard from "../../components/PacienteCard/Index";
import TelaCarregando from "../../components/TelaCarregando/Index";
import { usePacientes } from "../../hooks/usePacientes";

// tela de pacientes: busca e lista, no mesmo estilo da tela de consultas
export default function Paciente() {
    const { busca, setBusca, pacientes, carregando, erro, abrirDetalhePaciente } = usePacientes();

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

            {/* lista de pacientes num painel branco tipo lista de contatos */}
            <View style={styles.containerLista}>
                {carregando ? (
                    <TelaCarregando telaCheia />
                ) : pacientes.length === 0 ? (
                    <Text style={styles.textoVazio}>
                        {erro ?? "Nenhum paciente encontrado.\nCrie uma consulta para cadastrar um paciente."}
                    </Text>
                ) : (
                    <View style={styles.painelLista}>
                        <FlatList
                            data={pacientes}
                            keyExtractor={(item) => String(item.id_animal)}
                            renderItem={({ item }) => (
                                <PacienteCard paciente={item} onPress={() => abrirDetalhePaciente(item.id_animal)} />
                            )}
                            showsVerticalScrollIndicator={false}
                            ListFooterComponent={<View style={{ height: 40 }} />}
                        />
                    </View>
                )}
            </View>

        </View>
    );
}