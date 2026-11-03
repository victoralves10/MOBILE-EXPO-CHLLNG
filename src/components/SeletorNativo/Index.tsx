import React, { useState } from "react";
import { View } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import CampoSelecao from "../CampoSelecao/Index";
import { useTema } from "../../theme/TemaContext";

interface Props {
    titulo: string;
    valor: string;
    onChange: (valor: string) => void;
}

const doisDigitos = (n: number) => String(n).padStart(2, "0");

// "HH:MM" para Date
function paraDate(valor: string): Date {
    const data = new Date();
    if (valor) {
        const [hora, minuto] = valor.split(":").map(Number);
        data.setHours(hora, minuto);
    }
    return data;
}

// campo de horário com o relógio do celular
export default function SeletorNativo({ titulo, valor, onChange }: Props) {
    const [aberto, setAberto] = useState(false);
    const { escuro } = useTema();

    // horário escolhido
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
                aberto={aberto}
                onPress={() => setAberto(true)}
            />

            {aberto && <DateTimePicker
                    value={paraDate(valor)}
                    mode="time"
                    is24Hour
                    themeVariant={escuro ? "dark" : "light"}
                    onChange={aoEscolher}
                />}
        </View>
    );
}
