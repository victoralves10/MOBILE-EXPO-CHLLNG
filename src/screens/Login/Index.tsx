import React from "react";
import {
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StatusBar,
    Alert,
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { colors } from "../../global/colors";
import CustomTextInput from "../../components/CustomTextInput/Index";
import LogoMarca from "../../components/LogoMarca/Index";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {
    const {
        email,
        setEmail,
        senha,
        setSenha,
        senhaVisivel,
        carregando,
        fazerLogin,
        irParaCadastro,
    } = useLogin();

    return (
        <SafeAreaView style={styles.containerTela}>
            <StatusBar barStyle="dark-content" />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    contentContainerStyle={styles.containerScroll}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View>

                            <LogoMarca />

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
                                        rightIconName={senhaVisivel.iconeNome}
                                        rightIconType="button"
                                        onRightIconPress={senhaVisivel.alternar}
                                        secureTextEntry={senhaVisivel.escondida}
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
                                    onPress={fazerLogin}
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
                                    onPress={irParaCadastro}
                                >
                                    <Text style={styles.textoCadastro}>
                                        Não tem uma conta?{" "}
                                        <Text style={styles.textoCadastroDestaque}>Cadastre-se</Text>
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}