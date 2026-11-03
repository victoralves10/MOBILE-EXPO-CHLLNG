import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useTema } from "../../theme/TemaContext";

interface Props {
    telaCheia?: boolean;
}

// carregando
export default function TelaCarregando({ telaCheia = false }: Props) {
    const { cores } = useTema();

    return (
        <View
            style={{
                flex: telaCheia ? 1 : undefined,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: telaCheia ? 0 : 24,
                backgroundColor: telaCheia ? cores.fundo : "transparent",
            }}
        >
            <ActivityIndicator color={cores.primaria} size="large" />
        </View>
    );
}
