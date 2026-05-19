import React from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import ConsultaCard from "../../components/ConsultaCard/Index";
import PacienteCard from "../../components/PacienteCard/Index";

// dados mockados só pra testar os cards na home
const consultaMock = {
    id_consulta: "1",
    historico_consulta: "Vacinação anual V10",
    st_consulta: "Agendado" as const,
    dt_consulta: "20/05/2025",
    hr_consulta: "09:00",
    id_animal: "a1",
    id_responsavel: "r1",
};

const animalMock = {
    id_animal: "a1",
    rg_animal: "RG001",
    nr_microchip_animal: "985100001",
    nm_animal: "Thor",
    dt_nascimento_animal: "10/03/2019",
    peso_animal: "28",
    especie_animal: "Cão",
    raca_animal: "Labrador",
    id_responsavel: "r1",
};

const responsavelMock = {
    id_responsavel: "r1",
    cpf_responsavel: "111.111.111-11",
    nm_responsavel: "Carlos Oliveira",
    nr_telefone_responsavel: "(11) 99999-1111",
};

export default function Home() {
    return (
        <ScrollView style={{ flex: 1, padding: 16 }}>

            {/* teste do ConsultaCard */}
            <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 8 }}>
                Teste ConsultaCard
            </Text>
            <ConsultaCard
                consulta={consultaMock}
                animal={animalMock}
                onPress={() => Alert.alert("Card clicado", "Navegaria para o detalhe da consulta")}
                onPressIcone={() => Alert.alert("Ícone clicado", "Abriria a consulta online")}
            />

            {/* teste do PacienteCard */}
            <Text style={{ fontSize: 16, fontWeight: "700", marginBottom: 8, marginTop: 16 }}>
                Teste PacienteCard
            </Text>
            <PacienteCard
                animal={animalMock}
                responsavel={responsavelMock}
                onPress={() => Alert.alert("Card clicado", "Navegaria para a ficha do paciente")}
                onPressIcone={() => Alert.alert("Ícone clicado", "Abriria o WhatsApp")}
            />

        </ScrollView>
    );
}