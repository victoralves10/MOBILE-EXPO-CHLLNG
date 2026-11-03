import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { criarEstilos } from "./styles";
import { useEstilos } from "../../theme/useEstilos";
import { useTema } from "../../theme/TemaContext";

// logo do app
export default function LogoMarca() {
    const styles = useEstilos(criarEstilos);
    const { cores } = useTema();

    return (
        <View style={styles.containerLogo}>
            {/* ícone */}
            <LinearGradient
                colors={[cores.primaria, cores.secundaria]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.circuloLogo}
            >
                <Ionicons name="paw" size={40} color={cores.textoSobreCor} />
            </LinearGradient>

            <Text style={styles.textoMarca}>
                Clyvo <Text style={styles.textoMarcaDestaque}>ELLV</Text>
            </Text>
            <Text style={styles.textoMarcaSub}>gestão veterinária inteligente</Text>
        </View>
    );
}
