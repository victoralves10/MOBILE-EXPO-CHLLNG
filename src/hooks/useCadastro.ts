import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { useSenhaVisivel } from "./useSenhaVisivel";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";
import { mensagemDeErro } from "../services/api";
import { schemaCadastro } from "../validations/authValidations";
import { toastErro, toastSucesso } from "../utils/toast";

// toda a lógica da tela de cadastro
export function useCadastro() {
    const [nome, setNome] = useState("Vitinho");
    const [email, setEmail] = useState("teste2@teste.com");
    const [senha, setSenha] = useState("Teste@123");
    const [confirmarSenha, setConfirmarSenha] = useState("Teste@123");

    const senhaVisivel = useSenhaVisivel();
    const confirmarSenhaVisivel = useSenhaVisivel();
    const navigation = useNavigation<any>();
    const { iniciarSessao } = useAuth();

    // cria a conta no backend e já entra; se o e-mail já existir, mostra o aviso dele
    const mutation = useMutation({
        mutationFn: () => authService.cadastrar(nome.trim(), email.trim(), senha),
        onSuccess: async (sessao) => {
            toastSucesso(sessao.mensagem);
            await iniciarSessao(sessao);
        },
        onError: (erro) => toastErro(mensagemDeErro(erro)),
    });

    // valida os campos antes de mandar
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