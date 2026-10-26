import React from "react";
import { Linking } from "react-native";
import ItemLista from "../ItemLista/Index";
import { colors } from "../../global/colors";
import { ConsultaCardProps } from "./types";

// cor de cada status (é só visual, o status em si vem do backend)
const COR_STATUS = {
    Agendado: colors.bluePrimary,
    Atrasado: colors.danger,
    Concluido: colors.success,
};

// card de consulta: usa o ItemLista e só encaixa os dados que o backend mandou prontos
export default function ConsultaCard({ consulta, onPress, variante = "lista" }: ConsultaCardProps) {
    const { animal } = consulta;

    return (
        <ItemLista
            inicial={animal.inicial_animal}
            cor={COR_STATUS[consulta.st_consulta]}
            titulo={animal.nm_animal}
            textoDireita={consulta.data_hora_exibicao}
            subtitulo={consulta.historico_consulta}
            selo={consulta.st_consulta_rotulo}
            detalhe={`${animal.especie_animal} • ${animal.raca_animal_exibicao}`}
            acao={{
                icone: "videocam",
                cor: colors.bluePrimary,
                onPress: () => Linking.openURL(consulta.link_consulta_online),
            }}
            variante={variante}
            onPress={onPress}
        />
    );
}