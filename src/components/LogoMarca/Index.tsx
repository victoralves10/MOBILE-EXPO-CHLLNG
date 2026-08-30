import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../global/colors";
import { styles } from "./styles";

// logo Clyvo ELLV, usado no Login e Cadastro
export default function LogoMarca() {
    return (
        <View style={styles.containerLogo}>
            <View style={styles.circuloLogo}>
                <Ionicons name="paw" size={38} color={colors.white} />
            </View>
            <Text style={styles.textoMarca}>
                Clyvo <Text style={styles.textoMarcaDestaque}>ELLV</Text>
            </Text>
            <View style={styles.linhaDecorativa} />
            <Text style={styles.textoMarcaSub}>gestão veterinária inteligente</Text>
        </View>
    );
}