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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { criarEstilos } from "./styles";
import { useEstilos } from "../../theme/useEstilos";
import CustomTextInput from "../../components/CustomTextInput/Index";
import LogoMarca from "../../components/LogoMarca/Index";
import BotaoGradiente from "../../components/BotaoGradiente/Index";
import { useLogin } from "../../hooks/useLogin";
import { toastAviso } from "../../utils/toast";

// tela de login
export default function Login() {
    const styles = useEstilos(criarEstilos);
    const { email, setEmail, senha, setSenha, senhaVisivel, carregando, fazerLogin, irParaCadastro } = useLogin();

    return (
        <SafeAreaView style={styles.containerTela}>
            {/* enfeites */}
            <View style={styles.bolhaRoxa} />
            <View style={styles.bolhaVerde} />

            <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <ScrollView
                    contentContainerStyle={styles.containerScroll}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View>
                            <LogoMarca />

                            {/* formulário */}
                            <View style={styles.containerFormulario}>
                                <View style={styles.containerTextos}>
                                    <Text style={styles.textoTitulo}>Bem-vindo de volta 👋</Text>
                                    <Text style={styles.textoSubtitulo}>Entre para cuidar dos seus pacientes</Text>
                                </View>

                                <View style={styles.containerInputs}>
                                    <CustomTextInput
                                        title="E-mail"
                                        placeholder="seu@email.com"
                                        leftIconName="mail-outline"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        value={email}
                                        onChangeText={setEmail}
                                    />

                                    <CustomTextInput
                                        title="Senha"
                                        placeholder="Sua senha"
                                        leftIconName="lock-closed-outline"
                                        rightIconName={senhaVisivel.iconeNome}
                                        rightIconType="button"
                                        onRightIconPress={senhaVisivel.alternar}
                                        secureTextEntry={senhaVisivel.escondida}
                                        value={senha}
                                        onChangeText={setSenha}
                                    />

                                    <TouchableOpacity
                                        style={styles.botaoEsqueceuSenha}
                                        onPress={() => toastAviso("Fale com o administrador da clínica para redefinir sua senha.")}
                                    >
                                        <Text style={styles.textoEsqueceuSenha}>Esqueceu sua senha?</Text>
                                    </TouchableOpacity>
                                </View>

                                <BotaoGradiente texto="Entrar" icone="log-in-outline" onPress={fazerLogin} carregando={carregando} />

                                <TouchableOpacity style={styles.botaoCadastro} onPress={irParaCadastro}>
                                    <Text style={styles.textoCadastro}>
                                        Não tem uma conta? <Text style={styles.textoCadastroDestaque}>Cadastre-se</Text>
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
