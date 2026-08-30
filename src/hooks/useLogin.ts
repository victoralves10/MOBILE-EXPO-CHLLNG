import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { useSenhaVisivel } from "./useSenhaVisivel";
import { authController, ErroSemConexao } from "../controllers/authController";
import { toastErro, toastAviso } from "../utils/toast";

// espera um pouco antes de navegar, pra n deixar parecer que travou
function aguardar(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useLogin() {
    const [email, setEmail] = useState("dev@clyvovet.dev");
    const [senha, setSenha] = useState("dev123456");

    const senhaVisivel = useSenhaVisivel();
    const navigation = useNavigation<any>();

    const mutation = useMutation({
        mutationFn: () => authController.fazerLogin(email.trim(), senha.trim()),
        onSuccess: async (sucesso) => {
            if (sucesso) {
                await aguardar(600);
                navigation.reset({ index: 0, routes: [{ name: "App" }] });
            } else {
                toastErro("E-mail ou senha incorretos.");
            }
        },
        onError: (error) => {
            if (error instanceof ErroSemConexao) {
                toastErro("Sem conexão com o servidor.");
            } else {
                toastErro("Algo deu errado. Tente de novo.");
            }
        },
    });

    function fazerLogin() {
        if (!email.trim() || !senha.trim()) {
            toastAviso("Preencha e-mail e senha.");
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