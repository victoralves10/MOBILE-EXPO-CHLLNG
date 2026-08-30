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
    ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { colors } from "../../global/colors";
import CustomTextInput from "../../components/CustomTextInput/Index";
import LogoMarca from "../../components/LogoMarca/Index";
import { useCadastro } from "../../hooks/useCadastro";

export default function Cadastro() {
    const {
        nome,
        setNome,
        email,
        setEmail,
        senha,
        setSenha,
        confirmarSenha,
        setConfirmarSenha,
        senhaVisivel,
        confirmarSenhaVisivel,
        carregando,
        fazerCadastro,
        voltarParaLogin,
    } = useCadastro();

    return (
        <SafeAreaView style={styles.containerTela}>
            <StatusBar backgroundColor={colors.white} barStyle="dark-content" />

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
                                    <Text style={styles.textoTitulo}>Criar conta</Text>
                                    <Text style={styles.textoSubtitulo}>Preencha os dados para começar</Text>
                                </View>

                                <View style={styles.containerInputs}>
                                    <CustomTextInput
                                        title="Nome"
                                        placeholder="Seu nome completo"
                                        rightIconName="person"
                                        autoCapitalize="words"
                                        value={nome}
                                        onChangeText={setNome}
                                        titleStyle={{ color: colors.blueDark }}
                                    />

                                    <CustomTextInput
                                        title="E-mail"
                                        placeholder="Seu melhor e-mail"
                                        rightIconName="mail"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        value={email}
                                        onChangeText={setEmail}
                                        titleStyle={{ color: colors.blueDark }}
                                    />

                                    <CustomTextInput
                                        title="Senha"
                                        placeholder="Sua senha"
                                        rightIconName={senhaVisivel.iconeNome}
                                        rightIconType="button"
                                        onRightIconPress={senhaVisivel.alternar}
                                        secureTextEntry={senhaVisivel.escondida}
                                        value={senha}
                                        onChangeText={setSenha}
                                        titleStyle={{ color: colors.blueDark }}
                                    />

                                    <CustomTextInput
                                        title="Confirmar senha"
                                        placeholder="Digite a senha novamente"
                                        rightIconName={confirmarSenhaVisivel.iconeNome}
                                        rightIconType="button"
                                        onRightIconPress={confirmarSenhaVisivel.alternar}
                                        secureTextEntry={confirmarSenhaVisivel.escondida}
                                        value={confirmarSenha}
                                        onChangeText={setConfirmarSenha}
                                        titleStyle={{ color: colors.blueDark }}
                                    />
                                </View>

                                <TouchableOpacity
                                    style={[styles.botaoEntrar, carregando && { opacity: 0.7 }]}
                                    onPress={fazerCadastro}
                                    activeOpacity={0.8}
                                    disabled={carregando}
                                >
                                    {carregando ? (
                                        <ActivityIndicator color={colors.white} />
                                    ) : (
                                        <>
                                            <Ionicons name="person-add-outline" size={20} color={colors.white} />
                                            <Text style={styles.textoBotaoEntrar}>Criar conta</Text>
                                        </>
                                    )}
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.botaoCadastro}
                                    onPress={voltarParaLogin}
                                >
                                    <Text style={styles.textoCadastro}>
                                        Já tem uma conta?{" "}
                                        <Text style={styles.textoCadastroDestaque}>Fazer login</Text>
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