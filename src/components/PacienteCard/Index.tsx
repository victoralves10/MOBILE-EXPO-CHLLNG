import React from "react";
import { Linking } from "react-native";
import ItemLista from "../ItemLista/Index";
import { colors } from "../../global/colors";
import { PacienteCardProps } from "./types";

// card de paciente: mesmo visual do card de consulta, com o botão do WhatsApp do responsável
export default function PacienteCard({ paciente, onPress }: PacienteCardProps) {
    return (
        <ItemLista
            inicial={paciente.inicial_animal}
            cor={colors.bluePrimary}
            titulo={paciente.nm_animal}
            subtitulo={`Responsável: ${paciente.nm_responsavel}`}
            selo={paciente.especie_animal}
            detalhe={`Telefone: ${paciente.nr_telefone_responsavel_exibicao}`}
            acao={{
                icone: "logo-whatsapp",
                cor: "#25D366",
                onPress: () => Linking.openURL(paciente.link_whatsapp),
            }}
            onPress={onPress}
        />
    );
}