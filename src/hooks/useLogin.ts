import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { useSenhaVisivel } from "./useSenhaVisivel";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";
import { mensagemDeErro } from "../services/api";
import { toastErro, toastSucesso } from "../utils/toast";

// lógica da tela de login
export function useLogin() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const senhaVisivel = useSenhaVisivel();
    const navigation = useNavigation<any>();
    const { iniciarSessao } = useAuth();

    const mutation = useMutation({
        mutationFn: () => authService.login(email, senha),
        onSuccess: async (sessao) => {
            toastSucesso(sessao.mensagem);
            await iniciarSessao(sessao);
        },
        onError: (erro) => toastErro(mensagemDeErro(erro)),
    });

    return {
        email,
        setEmail,
        senha,
        setSenha,
        senhaVisivel,
        carregando: mutation.isPending,
        fazerLogin: () => mutation.mutate(),
        irParaCadastro: () => navigation.navigate("Cadastro"),
    };
}
