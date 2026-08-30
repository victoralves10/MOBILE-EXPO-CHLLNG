import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { useSenhaVisivel } from "./useSenhaVisivel";
import { emailValido, senhaForte } from "../utils/validacoes";
import { authController, ErroSemConexao } from "../controllers/authController";
import { toastErro, toastAviso } from "../utils/toast";

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

    const mutation = useMutation({
        mutationFn: () => authController.fazerCadastro(nome.trim(), email.trim(), senha),
        onSuccess: async (sucesso) => {
            if (sucesso) {
                await aguardar(600);
                // já loga direto, não precisa voltar pro login
                navigation.reset({ index: 0, routes: [{ name: "App" }] });
            } else {
                toastErro("Não deu pra criar a conta. Tenta outro e-mail.");
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

    function fazerCadastro() {
        if (!nome.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) {
            toastAviso("Preencha todos os campos.");
            return;
        }

        if (!emailValido(email.trim())) {
            toastErro("E-mail com formato inválido.");
            return;
        }

        if (senha !== confirmarSenha) {
            toastErro("As senhas não coincidem.");
            return;
        }

        if (!senhaForte(senha)) {
            toastErro("Senha fraca: min. 8 caracteres, com maiúscula, número e símbolo.");
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