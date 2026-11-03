import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { useSenhaVisivel } from "./useSenhaVisivel";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";
import { mensagemDeErro } from "../services/api";
import { toastErro, toastSucesso } from "../utils/toast";

// lógica da tela de cadastro
export function useCadastro() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const senhaVisivel = useSenhaVisivel();
    const confirmarSenhaVisivel = useSenhaVisivel();
    const navigation = useNavigation<any>();
    const { iniciarSessao } = useAuth();

    const mutation = useMutation({
        mutationFn: () => authService.cadastrar(nome, email, senha, confirmarSenha),
        onSuccess: async (sessao) => {
            toastSucesso(sessao.mensagem);
            await iniciarSessao(sessao);
        },
        onError: (erro) => toastErro(mensagemDeErro(erro)),
    });

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
        fazerCadastro: () => mutation.mutate(),
        voltarParaLogin: () => navigation.goBack(),
    };
}
