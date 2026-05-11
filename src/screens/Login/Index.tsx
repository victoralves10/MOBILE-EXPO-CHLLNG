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
import { colors } from "../../global/colors";
import { useNavigation } from "@react-navigation/native";

export default function Login() {

    // Esses estados guardam o que o usuário digita nos inputs (dps mudar para outra pagina)
    const [email, setEmail] = useState("teste@email.com");
    const [senha, setSenha] = useState("123456");

    // Simulação de uma autenticação sem um backend
    const USUARIO = {
        email: "teste@email.com",
        senha: "123456",
    };

    // Funçãozinha basica para vildar oq foi digitado e realizar o login
    function handleLogin() {

        if (email === USUARIO.email && senha === USUARIO.senha) {

            navigation.navigate("App");

        } else {

            alert("E-mail ou senha incorretos!");
            
        }
    }

    const navigation = useNavigation<any>();

    return (

        // O KeyboardAvoidingView empurra a tela pra cima quando o teclado abre
        // behavior muda conforme o sistema operacional
        <KeyboardAvoidingView
            style={styles.containerTela}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>

            {/* Controla a barra de status do celular (wi-fi, hora, bateria e etc...) */}
            <StatusBar
                backgroundColor={colors.black}
                barStyle="light-content"/>

            {/* Fecha o teclado quando tocar no resto da tela */}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                <View style={{ flex: 1 }}>

                    {/* TOPO - parte da image do caozinho */}
                    <View style={styles.containerTopo}>

                        <Image
                            source={require("../../../assets/img-login.png")}
                            style={styles.imagemLogo}
                        />

                    </View>

                    {/* FORMULÁRIO - parte do e-mail, senha, login e etc... */}
                    <View style={styles.containerFormulario}>

                        {/* BLOCO SUPERIOR - titulo e inputs*/}
                        <View style={styles.containerCampos}>
                            
                            {/* Titulo da tela (Login) */}
                            <Text style={styles.textoTitulo}>
                                Login
                            </Text>

                            {/* INPUT EMAIL */}
                            <View style={styles.containerInput}>


                                <Text style={styles.textoLabel}>
                                    E-mail
                                </Text>

                                {/* Campo de digitação do email */}
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

                                <Text style={styles.textoLabel}>
                                    Senha
                                </Text>

                                {/* Campo de digitação da senha - secureTextEntry esconde o texto de deixa uma bolinha */}
                                <TextInput
                                    style={styles.campoInput}
                                    value={senha}
                                    onChangeText={setSenha}
                                    secureTextEntry
                                    placeholder="Digite sua senha"
                                />

                            </View>

                            {/* ESQUECI SENHA */}
                            <TouchableOpacity
                                style={styles.containerEsqueciSenha}
                                onPress={() => console.log("esqueci senha")}
                            >

                                <Text style={styles.textoLink}>
                                    Esqueci minha senha
                                </Text>

                            </TouchableOpacity>

                        </View>

                        {/* BLOCO INFERIOR - botão principal de login*/}
                        <View style={styles.containerAcoes}>

                            {/* BOTÃO LOGIN */}
                            <TouchableOpacity
                                style={styles.botaoEntrar}
                                onPress={handleLogin}
                            >

                                <Text style={styles.textoBotao}>
                                    Entrar
                                </Text>

                            </TouchableOpacity>
                        </View>

                    </View>

                </View>

            </TouchableWithoutFeedback>

        </KeyboardAvoidingView>
    );
}