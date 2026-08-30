import React, { useState, useEffect, useRef } from "react";
import {
    View,
    Text,
    Animated,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StatusBar,
    Alert,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { colors } from "../../global/colors";
import CustomTextInput from "../../components/CustomTextInput/Index";
import { authController } from "../../controllers/authController";

export default function Login() {
    const [email, setEmail] = useState("dev@clyvovet.dev");
    const [senha, setSenha] = useState("dev123456");
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [carregando, setCarregando] = useState(false);

    const navigation = useNavigation<any>();

    // tela sobe quando teclado abre
    // evita que o teclado tampe os campos
    const deslocamentoY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const abrir = Keyboard.addListener("keyboardDidShow", () => {
            Animated.timing(deslocamentoY, { toValue: -250, duration: 250, useNativeDriver: true }).start();
        });
        const fechar = Keyboard.addListener("keyboardDidHide", () => {
            Animated.timing(deslocamentoY, { toValue: 0, duration: 250, useNativeDriver: true }).start();
        });
        return () => {
            abrir.remove();
            fechar.remove();
        };
    }, [deslocamentoY]);

    async function handleLogin() {

        if (!email.trim() || !senha.trim()) {
            Alert.alert("Atenção", "Preencha o e-mail e a senha.");
            return;
        }

        setCarregando(true);

        try {
            const sucesso = await authController.fazerLogin(email.trim(), senha.trim());

            if (sucesso) {
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
            setCarregando(false);
        }
    }

    return (
        <SafeAreaView style={styles.containerTela}>
            <StatusBar backgroundColor={colors.white} barStyle="dark-content" />

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Animated.View style={[styles.containerConteudo, { transform: [{ translateY: deslocamentoY }] }]}>

                    {/* logo, centralizado, sem imagem de fundo */}
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

                    {/* card do formulário */}
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
                                rightIconName={senhaVisivel ? "eye-off" : "eye"}
                                rightIconType="button"
                                onRightIconPress={() => setSenhaVisivel(!senhaVisivel)}
                                secureTextEntry={!senhaVisivel}
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

                        <TouchableOpacity
                            style={[styles.botaoEntrar, carregando && { opacity: 0.7 }]}
                            onPress={handleLogin}
                            activeOpacity={0.8}
                            disabled={carregando}
                        >
                            {carregando ? (
                                <ActivityIndicator color={colors.white} />
                            ) : (
                                <>
                                    <Ionicons name="log-in-outline" size={20} color={colors.white} />
                                    <Text style={styles.textoBotaoEntrar}>Entrar</Text>
                                </>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.botaoCadastro}
                            onPress={() => navigation.navigate("Cadastro")}
                        >
                            <Text style={styles.textoCadastro}>
                                Não tem uma conta?{" "}
                                <Text style={styles.textoCadastroDestaque}>Cadastre-se</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>

                </Animated.View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}