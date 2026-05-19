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
    Alert,
    ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { colors } from "../../global/colors";
import CustomTextInput from "../../components/CustomTextInput/Index";
import { authController } from "../../controllers/authController";

export default function Login() {
    const [email, setEmail] = useState("teste@email.com");
    const [senha, setSenha] = useState("123456");
    const [carregando, setCarregando] = useState(false);

    const navigation = useNavigation<any>();

    async function handleLogin() {

        if (!email.trim() || !senha.trim()) {
            Alert.alert("Atenção", "Preencha o e-mail e a senha.");
            return;
        }

        setCarregando(true);

        try {
            const sucesso = await authController.fazerLogin(email.trim(), senha.trim());

            if (sucesso) {
                // login ok — vai pro app e limpa o histórico (não volta pro login com o botão voltar)
                navigation.reset({
                    index: 0,
                    routes: [{ name: "App" }],
                });
            } else {
                Alert.alert("Erro de Acesso", "E-mail ou senha incorretos!");
            }
        } catch (error) {
            Alert.alert("Erro", "Algo deu errado. Tente novamente.");
        } finally {
            // para o carregando independente do resultado
            setCarregando(false);
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

            {/* clicando fora dos inputs fecha o teclado */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.containerConteudo}>

                    {/* parte de cima — imagem de banner */}
                    <View style={styles.containerBanner}>
                        <Image
                            source={require("../../../assets/img-login.png")}
                            style={styles.imagemBanner}
                        />
                    </View>

                    {/* parte de baixo — formulário de login */}
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
                                placeholder="Sua senha cadastrada"
                                rightIconName="lock-closed"
                                secureTextEntry
                                value={senha}
                                onChangeText={setSenha}
                                titleStyle={{ color: colors.blueDark }}
                            />

                            <TouchableOpacity
                                style={styles.botaoEsqueceuSenha}
                                onPress={() => Alert.alert("Recuperar senha", "Entre em contato com o administrador.")}
                            >
                                <Text style={styles.textoEsqueceuSenha}>Esqueceu sua senha?</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.containerAcoes}>

                            {/* botão de entrar — fica desabilitado enquanto carrega */}
                            <TouchableOpacity
                                style={[styles.botaoEntrar, carregando && { opacity: 0.7 }]}
                                onPress={handleLogin}
                                activeOpacity={0.8}
                                disabled={carregando}
                            >
                                {/* se estiver carregando mostra o círculo, senão mostra o texto */}
                                {carregando ? (
                                    <ActivityIndicator color={colors.white} />
                                ) : (
                                    <Text style={styles.textoBotaoEntrar}>Entrar</Text>
                                )}
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.botaoCadastro}
                                onPress={() => Alert.alert("Cadastro", "Entre em contato com o administrador.")}
                            >
                                <Text style={styles.textoCadastro}>
                                    Não tem uma conta?{" "}
                                    <Text style={styles.textoCadastroDestaque}>Cadastre-se</Text>
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}