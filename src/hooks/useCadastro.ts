import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { useSenhaVisivel } from "./useSenhaVisivel";
import { useAuth } from "../context/AuthContext";
import { authController, ErroSemConexao } from "../controllers/authController";
import { schemaCadastro } from "../validations/authValidations";
import { toastErro } from "../utils/toast";

function aguardar(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useCadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const senhaVisivel = useSenhaVisivel();
    const confirmarSenhaVisivel = useSenhaVisivel();
    const navigation = useNavigation<any>();
    const { entrar } = useAuth();

    const mutation = useMutation({
        mutationFn: () => authController.fazerCadastro(nome.trim(), email.trim(), senha),
        onSuccess: async (sucesso) => {
            if (sucesso) {
                await aguardar(600);
                entrar();
            } else {
                toastErro("Não deu pra criar a conta. Tenta outro e-mail.");
            }
        },
        onError: (error) => {
            console.error("[useCadastro.fazerCadastro]", error);
            if (error instanceof ErroSemConexao) {
                toastErro("Sem conexão com o servidor.");
            } else {
                toastErro("Algo deu errado. Tente de novo.");
            }
        },
    });

    async function fazerCadastro() {
        try {
            await schemaCadastro.validate({ nome, email, senha, confirmarSenha });
        } catch (erro: any) {
            toastErro(erro.message);
            return;
        }
        mutation.mutate();
    }

    function voltarParaLogin() {
        navigation.goBack();
    }

    return {
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
        carregando: mutation.isPending,
        fazerCadastro,
        voltarParaLogin,
    };
}
