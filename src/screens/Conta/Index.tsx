import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { colors } from "../../global/colors";
import { authController } from "../../controllers/authController";
import { User } from "../../models/User";

export default function Conta() {
    const [usuario, setUsuario] = useState<User | null>(null);
    const navigation = useNavigation<any>();

    // carrega os dados do usuário logado quando a tela abre
    useEffect(() => {
        async function carregarUsuario() {
            const user = await authController.buscarUsuarioLogado();
            setUsuario(user);
        }
        carregarUsuario();
    }, []);

    async function handleLogout() {
        Alert.alert(
            "Sair",
            "Deseja realmente sair da sua conta?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sair",
                    style: "destructive",
                    onPress: async () => {

                        // limpa a sessão do asyncstorage e volta pro login
                        await authController.fazerLogout();
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "Login" }],
                        });
                    },
                },
            ]
        );
    }

    // pega a primeira letra do nome pra mostrar no avatar
    const inicial = usuario?.nm_usuario
        ? usuario.nm_usuario.charAt(0).toUpperCase()
        : "U";

    return (
        <ScrollView style={styles.container}>

            {/* header com avatar, nome e email */}
            <View style={styles.containerHeader}>
                <View style={styles.containerAvatar}>
                    <Text style={styles.textoInicialAvatar}>{inicial}</Text>
                </View>
                <Text style={styles.textoNome}>
                    {usuario?.nm_usuario ?? "Usuário"}
                </Text>
                <Text style={styles.textoEmail}>
                    {usuario?.email ?? ""}
                </Text>
            </View>

            {/* seção de menu com opções em breve */}
            <View style={styles.containerSecao}>
                <TouchableOpacity
                    style={styles.itemMenu}
                    onPress={() => Alert.alert("Em breve", "Funcionalidade em desenvolvimento.")}
                >
                    <Ionicons name="person-outline" size={22} color={colors.bluePrimary} />
                    <Text style={styles.textoItemMenu}>Meu Perfil</Text>
                    <Ionicons name="chevron-forward" size={20} color={colors.grayMedium} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.itemMenu}
                    onPress={() => Alert.alert("Em breve", "Funcionalidade em desenvolvimento.")}
                >
                    <Ionicons name="notifications-outline" size={22} color={colors.bluePrimary} />
                    <Text style={styles.textoItemMenu}>Notificações</Text>
                    <Ionicons name="chevron-forward" size={20} color={colors.grayMedium} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.itemMenu}
                    onPress={() => Alert.alert("Em breve", "Funcionalidade em desenvolvimento.")}
                >
                    <Ionicons name="shield-checkmark-outline" size={22} color={colors.bluePrimary} />
                    <Text style={styles.textoItemMenu}>Privacidade</Text>
                    <Ionicons name="chevron-forward" size={20} color={colors.grayMedium} />
                </TouchableOpacity>
            </View>

            {/* botão de sair da conta */}
            <View style={styles.containerSecao}>
                <TouchableOpacity
                    style={[styles.itemMenu, styles.itemMenuPerigo]}
                    onPress={handleLogout}
                >
                    <Ionicons name="log-out-outline" size={22} color={colors.danger} />
                    <Text style={[styles.textoItemMenu, styles.textoItemMenuPerigo]}>
                        Sair da conta
                    </Text>
                </TouchableOpacity>
            </View>

            {/* versão do app no rodapé */}
            <View style={styles.containerVersao}>
                <Text style={styles.textoVersao}>ClyvoVet v1.0.0</Text>
            </View>

        </ScrollView>
    );
}