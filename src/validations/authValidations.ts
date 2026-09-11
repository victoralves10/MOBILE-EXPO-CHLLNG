import * as yup from "yup";
import { senhaForte } from "../utils/validacoes";

const MSG_SENHA_FRACA = "Senha fraca: mín. 8 caracteres, com maiúscula, minúscula, número e símbolo.";

export const schemaLogin = yup.object({
    email: yup.string().trim().required("Informe o e-mail.").email("E-mail com formato inválido."),
    senha: yup.string().trim().required("Informe a senha."),
});

export const schemaCadastro = yup.object({
    nome: yup.string().trim().required("Informe seu nome."),
    email: yup.string().trim().required("Informe o e-mail.").email("E-mail com formato inválido."),
    senha: yup
        .string()
        .required("Informe a senha.")
        .test("senha-forte", MSG_SENHA_FRACA, (valor) => !!valor && senhaForte(valor)),
    confirmarSenha: yup
        .string()
        .required("Confirme a senha.")
        .oneOf([yup.ref("senha")], "As senhas não coincidem."),
});

export const schemaEditarPerfil = yup.object({
    nome: yup.string().trim().required("Informe o nome."),
    email: yup.string().trim().required("Informe o e-mail.").email("E-mail com formato inválido."),
    novaSenha: yup
        .string()
        .test("senha-forte", MSG_SENHA_FRACA, (valor) => !valor || senhaForte(valor)),
});

export const schemaApagarConta = yup.object({
    senha: yup.string().required("Digite sua senha atual para confirmar."),
});
