import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { useSenhaVisivel } from "./useSenhaVisivel";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";
import { mensagemDeErro } from "../services/api";
import { schemaLogin } from "../validations/authValidations";
import { toastErro, toastSucesso } from "../utils/toast";

// toda a lógica da tela de login
export function useLogin() {
    const [email, setEmail] = useState("dev@clyvovet.dev");
    const [senha, setSenha] = useState("dev123456");

    const senhaVisivel = useSenhaVisivel();
    const navigation = useNavigation<any>();
    const { iniciarSessao } = useAuth();

    // manda o login pro backend; deu certo entra no app, deu errado mostra a mensagem dele
    const mutation = useMutation({
        mutationFn: () => authService.login(email.trim(), senha),
        onSuccess: async (sessao) => {
            toastSucesso(sessao.mensagem);
            await iniciarSessao(sessao);
        },
        onError: (erro) => toastErro(mensagemDeErro(erro)),
    });

    // valida os campos antes de mandar
    async function fazerLogin() {
        try {
            await schemaLogin.validate({ email, senha });
        } catch (erro: any) {
            toastErro(erro.message);
            return;
        }
        mutation.mutate();
    }

    function irParaCadastro() {
        navigation.navigate("Cadastro");
    }

    return {
        email,
        setEmail,
        senha,
        setSenha,
        senhaVisivel,
        carregando: mutation.isPending,
        fazerLogin,
        irParaCadastro,
    };
}