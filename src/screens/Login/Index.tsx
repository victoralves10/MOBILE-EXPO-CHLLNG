import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    StatusBar,
    Alert
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { colors } from "../../global/colors";
import CustomTextInput from "../../components/CustomTextInput/Index";

export default function Login() {
    // Estados para armazenar os dados dos inputs
    const [email, setEmail] = useState("teste@email.com");
    const [senha, setSenha] = useState("123456");

    const navigation = useNavigation<any>();

    // Objeto de usuário simulado para validação
    const USUARIO_MOCK = {
        email: "teste@email.com",
        senha: "123456",
    };

    // Função que valida o login
    function handleLogin() {
        if (email === USUARIO_MOCK.email && senha === USUARIO_MOCK.senha) {
            navigation.navigate("App");
        } else {
            Alert.alert("Erro de Acesso", "E-mail ou senha incorretos!");
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.containerTela}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <StatusBar
                backgroundColor="transparent"
                translucent
                barStyle="light-content"
            />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.containerConteudo}>
                    
                    {/* Seção da Imagem de Fundo */}
                    <View style={styles.containerBanner}>
                        <Image
                            source={require("../../../assets/img-login.png")}
                            style={styles.imagemBanner}
                        />
                    </View>

                    {/* Formulário de Entrada */}
                    <View style={styles.containerFormulario}>
                        
                        <View style={styles.containerTextos}>
                            <Text style={styles.textoTitulo}>Bem-vindo</Text>
                            <Text style={styles.textoSubtitulo}>Faça login para continuar</Text>
                        </View>

                        <View style={styles.containerInputs}>
                            <CustomTextInput
                                title="E-mail"
                                placeholder="Seu e-mail cadastrado"
                                rightIconName="mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                                titleStyle={{ color: colors.blueDark }}
                            />

                            <CustomTextInput
                                title="Senha"
                                placeholder="Sua senha secreta"
                                rightIconName="lock-closed"
                                secureTextEntry
                                value={senha}
                                onChangeText={setSenha}
                                titleStyle={{ color: colors.blueDark }}
                            />

                            <TouchableOpacity 
                                style={styles.botaoEsqueceuSenha}
                                onPress={() => console.log("Recuperar senha")}
                            >
                                <Text style={styles.textoEsqueceuSenha}>Esqueceu sua senha?</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.containerAcoes}>
                            <TouchableOpacity
                                style={styles.botaoEntrar}
                                onPress={handleLogin}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.textoBotaoEntrar}>Entrar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                                style={styles.botaoCadastro}
                                onPress={() => console.log("Ir para Cadastro")}
                            >
                                <Text style={styles.textoCadastro}>
                                    Não tem uma conta? <Text style={styles.textoCadastroDestaque}>Cadastre-se</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}