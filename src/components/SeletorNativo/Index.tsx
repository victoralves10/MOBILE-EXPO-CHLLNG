import React, { useState } from "react";
import { View } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import CampoSelecao from "../CampoSelecao/Index";

interface Props {
    titulo: string;
    valor: string; // HH:MM
    onChange: (valor: string) => void;
}

const doisDigitos = (n: number) => String(n).padStart(2, "0");

// transforma o "HH:MM" guardado em Date pro relógio abrir no horário certo
function paraDate(valor: string): Date {
    const data = new Date();
    if (valor) {
        const [hora, minuto] = valor.split(":").map(Number);
        data.setHours(hora, minuto);
    }
    return data;
}

// campo que abre o relógio do próprio celular pra escolher o horário
export default function SeletorNativo({ titulo, valor, onChange }: Props) {
    const [aberto, setAberto] = useState(false);

    // usuário confirmou: guarda no formato HH:MM, que é o que o backend recebe
    function aoEscolher(evento: DateTimePickerEvent, data?: Date) {
        setAberto(false);
        if (evento.type !== "set" || !data) return;
        onChange(`${doisDigitos(data.getHours())}:${doisDigitos(data.getMinutes())}`);
    }

    return (
        <View>
            <CampoSelecao
                titulo={titulo}
                texto={valor}
                placeholder="Escolha o horário"
                icone="time-outline"
                onPress={() => setAberto(true)}
            />

            {aberto && <DateTimePicker value={paraDate(valor)} mode="time" is24Hour onChange={aoEscolher} />}
        </View>
    );
}