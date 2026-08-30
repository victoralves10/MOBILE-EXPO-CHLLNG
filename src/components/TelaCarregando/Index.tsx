import React from "react";
import { View, ActivityIndicator } from "react-native";
import { colors } from "../../global/colors";

interface Props {
    telaCheia?: boolean; // ocupa a tela inteira se true; senão, só um espaço menor
}

// spinner de carregamento — usado sempre que uma tela/seção está buscando dados
export default function TelaCarregando({ telaCheia = false }: Props) {
    return (
        <View
            style={{
                flex: telaCheia ? 1 : undefined,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: telaCheia ? 0 : 24,
                backgroundColor: telaCheia ? colors.white : "transparent",
            }}
        >
            <ActivityIndicator color={colors.bluePrimary} size="large" />
        </View>
    );
}