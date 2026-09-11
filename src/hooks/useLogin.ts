import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { useSenhaVisivel } from "./useSenhaVisivel";
import { useAuth } from "../context/AuthContext";
import { authController, ErroSemConexao } from "../controllers/authController";
import { schemaLogin } from "../validations/authValidations";
import { toastErro } from "../utils/toast";

function aguardar(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useLogin() {
    const [email, setEmail] = useState("dev@clyvovet.dev");
    const [senha, setSenha] = useState("dev123456");

    const senhaVisivel = useSenhaVisivel();
    const navigation = useNavigation<any>();
    const { entrar } = useAuth();

    const mutation = useMutation({
        mutationFn: () => authController.fazerLogin(email.trim(), senha.trim()),
        onSuccess: async (sucesso) => {
            if (sucesso) {
                await aguardar(600);
                entrar();
            } else {
                toastErro("E-mail ou senha incorretos.");
            }
        },
        onError: (error) => {
            console.error("[useLogin.fazerLogin]", error);
            if (error instanceof ErroSemConexao) {
                toastErro("Sem conexão com o servidor.");
            } else {
                toastErro("Algo deu errado. Tente de novo.");
            }
        },
    });

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
