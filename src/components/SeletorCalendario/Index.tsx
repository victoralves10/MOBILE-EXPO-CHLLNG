import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Calendar, LocaleConfig } from "react-native-calendars";
import CampoSelecao from "../CampoSelecao/Index";
import { colors } from "../../global/colors";
import { dataParaTela } from "../../utils/mascaras";
import { styles } from "./styles";

// deixa o calendário em português
LocaleConfig.locales["pt-br"] = {
    monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    today: "Hoje",
};
LocaleConfig.defaultLocale = "pt-br";

interface Props {
    titulo: string;
    valor: string; // AAAA-MM-DD, do jeito que o backend recebe
    onChange: (valor: string) => void;
}

// hoje no formato AAAA-MM-DD, só pra saber em qual mês o calendário abre
function hoje() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-01`;
}

// campo de data que abre um calendário em português embaixo dele
// tem botões pra pular de ano em ano (ajuda muito na data de nascimento)
export default function SeletorCalendario({ titulo, valor, onChange }: Props) {
    const [aberto, setAberto] = useState(false);
    const [mesVisivel, setMesVisivel] = useState(valor || hoje());

    // pula um ano pra frente ou pra trás, mantendo o mês
    function mudarAno(quanto: number) {
        const [ano, mes] = mesVisivel.split("-");
        setMesVisivel(`${Number(ano) + quanto}-${mes}-01`);
    }

    return (
        <View>
            <CampoSelecao
                titulo={titulo}
                texto={dataParaTela(valor)}
                placeholder="Escolha a data"
                icone="calendar-outline"
                onPress={() => setAberto(!aberto)}
            />

            {aberto && (
                <View style={styles.caixa}>
                    {/* troca de ano */}
                    <View style={styles.linhaAno}>
                        <TouchableOpacity onPress={() => mudarAno(-1)} style={styles.botaoAno}>
                            <Ionicons name="play-back" size={16} color={colors.bluePrimary} />
                        </TouchableOpacity>
                        <Text style={styles.textoAno}>{mesVisivel.slice(0, 4)}</Text>
                        <TouchableOpacity onPress={() => mudarAno(1)} style={styles.botaoAno}>
                            <Ionicons name="play-forward" size={16} color={colors.bluePrimary} />
                        </TouchableOpacity>
                    </View>

                    {/* key faz o calendário ir pro mês certo quando troca o ano */}
                    <Calendar
                        key={mesVisivel}
                        current={mesVisivel}
                        onMonthChange={(mes) => setMesVisivel(`${mes.dateString.slice(0, 7)}-01`)}
                        markedDates={valor ? { [valor]: { selected: true, selectedColor: colors.bluePrimary } } : {}}
                        onDayPress={(dia) => {
                            onChange(dia.dateString);
                            setAberto(false);
                        }}
                        theme={{ todayTextColor: colors.bluePrimary, arrowColor: colors.bluePrimary }}
                    />
                </View>
            )}
        </View>
    );
}