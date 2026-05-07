import {
    View,
    Text,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    StatusBar
} from "react-native";

import { styles } from "./styles";
import { useState } from "react";

export default function Login() {
    // Estados para armazenar os dados digitados
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    // Usuário mockado (simulação de login)
    const USUARIO = {
        email: "teste@email.com",
        senha: "123456",
    };

    // Função chamada ao clicar no botão Entrar
    function handleLogin() {
        if (email === USUARIO.email && senha === USUARIO.senha) {
            // navegar para a próxima tela
            console.log("Login OK!");
        } else {
            alert("E-mail ou senha incorretos!");
        }
    }

    return (
        // Evita que o teclado sobreponha os inputs
        <KeyboardAvoidingView
            style={styles.containerTela}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
        <StatusBar backgroundColor="black"/>

            {/* Fecha o teclado ao clicar fora */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    
                    {/* TOPO - imagem de capa */}
                    <View style={styles.containerTopo}>
                        <Image
                            source={require("../../../assets/img-login.png")}
                            style={styles.imagemLogo}
                        />
                    </View>

                    {/* PARTE DE BAIXO - formulário */}
                    <View style={styles.containerFormulario}>
                        <Text style={styles.textoTitulo}>Login</Text>

                        {/* INPUT EMAIL */}
                        <View style={styles.containerInput}>
                            <Text style={styles.textoLabel}>E-mail</Text>
                            <TextInput
                                style={styles.campoInput}
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                placeholder="exemplo@email.com"
                            />
                        </View>

                        {/* INPUT SENHA */}
                        <View style={styles.containerInput}>
                            <Text style={styles.textoLabel}>Senha</Text>
                            <TextInput
                                style={styles.campoInput}
                                value={senha}
                                onChangeText={setSenha}
                                secureTextEntry
                                placeholder="Digite sua senha"
                            />
                        </View>

                        {/* LINK ESQUECI SENHA */}
                        <TouchableOpacity
                            onPress={() => console.log("esqueci senha")}
                            style={{ marginTop: 16 }}
                        >
                            <Text style={styles.textoLink}>
                                Esqueci minha senha
                            </Text>
                        </TouchableOpacity>

                        {/* BOTÃO LOGIN */}
                        <TouchableOpacity
                            style={styles.botaoEntrar}
                            onPress={handleLogin}
                        >
                            <Text style={styles.textoBotao}>Entrar</Text>
                        </TouchableOpacity>

                        {/* LINK CADASTRO */}
                        <TouchableOpacity
                            onPress={() => console.log("cadastro")}
                            style={{ marginTop: 12 }}
                        >
                            <Text style={styles.textoLink}>
                                Não tem conta?{" "}
                                <Text style={styles.textoLinkDestaque}>
                                    Cadastre-se
                                </Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}