import React from "react";
import { Linking } from "react-native";
import ItemLista from "../ItemLista/Index";
import { useTema } from "../../theme/TemaContext";
import { corDoStatus } from "../../theme/paletas";
import { ConsultaCardProps } from "./types";

// card de consulta: usa o ItemLista e só encaixa os dados que o backend mandou prontos
export default function ConsultaCard({ consulta, onPress, variante = "lista" }: ConsultaCardProps) {
    const { cores } = useTema();
    const { animal } = consulta;

    return (
        <ItemLista
            inicial={animal.inicial_animal}
            cor={corDoStatus(cores, consulta.st_consulta)}
            titulo={animal.nm_animal}
            textoDireita={consulta.data_hora_exibicao}
            subtitulo={consulta.historico_consulta}
            selo={consulta.st_consulta_rotulo}
            detalhe={`${animal.especie_animal} • ${animal.raca_animal_exibicao}`}
            acao={{
                icone: "videocam",
                cor: cores.primaria,
                onPress: () => Linking.openURL(consulta.link_consulta_online),
            }}
            variante={variante}
            onPress={onPress}
        />
    );
}
