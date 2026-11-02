import React from "react";
import { View, Text, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { criarEstilos } from "./styles";
import { useEstilos } from "../../theme/useEstilos";
import { useTema } from "../../theme/TemaContext";
import CustomTextInput from "../../components/CustomTextInput/Index";
import PacienteCard from "../../components/PacienteCard/Index";
import TelaCarregando from "../../components/TelaCarregando/Index";
import { usePacientes } from "../../hooks/usePacientes";

// tela de pacientes: busca e lista, no mesmo estilo da tela de consultas
export default function Paciente() {
    const styles = useEstilos(criarEstilos);
    const { cores } = useTema();
    const { busca, setBusca, pacientes, carregando, erro, abrirDetalhePaciente } = usePacientes();

    return (
        <View style={styles.container}>
            {/* busca */}
            <View style={styles.containerBusca}>
                <CustomTextInput
                    placeholder="Buscar por animal ou responsável..."
                    leftIconName="search"
                    value={busca}
                    onChangeText={setBusca}
                    containerStyle={{ marginBottom: 0 }}
                />
            </View>

            {/* lista num painel tipo lista de contatos */}
            <View style={styles.containerLista}>
                {carregando ? (
                    <TelaCarregando telaCheia />
                ) : pacientes.length === 0 ? (
                    <View style={styles.containerVazio}>
                        <View style={styles.circuloVazio}>
                            <Ionicons name="paw-outline" size={34} color={cores.pacientes} />
                        </View>
                        <Text style={styles.textoVazio}>
                            {erro ?? "Nenhum paciente encontrado.\nCrie uma consulta para cadastrar um paciente."}
                        </Text>
                    </View>
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
