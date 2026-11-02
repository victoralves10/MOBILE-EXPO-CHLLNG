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
import { useCadastro } from "../../hooks/useCadastro";

// tela de cadastro (mesmo visual do login)
export default function Cadastro() {
    const styles = useEstilos(criarEstilos);
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
            {/* enfeites coloridos no fundo */}
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

                            {/* card do formulário */}
                            <View style={styles.containerFormulario}>
                                <View style={styles.containerTextos}>
                                    <Text style={styles.textoTitulo}>Criar conta ✨</Text>
                                    <Text style={styles.textoSubtitulo}>Leva menos de um minuto</Text>
                                </View>

                                <View style={styles.containerInputs}>
                                    <CustomTextInput
                                        title="Nome"
                                        placeholder="Seu nome completo"
                                        leftIconName="person-outline"
                                        autoCapitalize="words"
                                        value={nome}
                                        onChangeText={setNome}
                                    />
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
                                        placeholder="Mín. 8 caracteres, com símbolo"
                                        leftIconName="lock-closed-outline"
                                        rightIconName={senhaVisivel.iconeNome}
                                        rightIconType="button"
                                        onRightIconPress={senhaVisivel.alternar}
                                        secureTextEntry={senhaVisivel.escondida}
                                        value={senha}
                                        onChangeText={setSenha}
                                    />
                                    <CustomTextInput
                                        title="Confirmar senha"
                                        placeholder="Digite a senha novamente"
                                        leftIconName="shield-checkmark-outline"
                                        rightIconName={confirmarSenhaVisivel.iconeNome}
                                        rightIconType="button"
                                        onRightIconPress={confirmarSenhaVisivel.alternar}
                                        secureTextEntry={confirmarSenhaVisivel.escondida}
                                        value={confirmarSenha}
                                        onChangeText={setConfirmarSenha}
                                    />
                                </View>

                                <BotaoGradiente
                                    texto="Criar conta"
                                    icone="person-add-outline"
                                    onPress={fazerCadastro}
                                    carregando={carregando}
                                />

                                <TouchableOpacity style={styles.botaoCadastro} onPress={voltarParaLogin}>
                                    <Text style={styles.textoCadastro}>
                                        Já tem uma conta? <Text style={styles.textoCadastroDestaque}>Fazer login</Text>
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
