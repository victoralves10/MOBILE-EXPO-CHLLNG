import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FiltroTabs from "../FiltroTabs/Index";
import { useTema } from "../../theme/TemaContext";
import { StatusConsulta } from "../../models/Consulta";

interface Props {
    valor: StatusConsulta;
    onChange: (valor: StatusConsulta) => void;
}

// situação da consulta
export default function SeletorSituacao({ valor, onChange }: Props) {
    const { cores } = useTema();

    return (
        <View style={estilos.container}>
            <Text style={[estilos.rotulo, { color: cores.textoSecundario }]}>Situação</Text>
            <FiltroTabs
                opcoes={[
                    { valor: "Agendado", label: "Agendar", cor: cores.agendado, icone: "calendar" },
                    { valor: "Concluido", label: "Já realizada", cor: cores.concluido, icone: "checkmark-done" },
                ]}
                valorSelecionado={valor}
                onSelecionar={onChange}
            />
        </View>
    );
}

const estilos = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    rotulo: {
        fontSize: 13,
        fontWeight: "700",
        marginBottom: 8,
        marginLeft: 2,
    },
});
