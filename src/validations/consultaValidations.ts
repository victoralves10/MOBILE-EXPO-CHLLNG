import * as yup from "yup";
import { dataValida, horaValida, cpfValido, telefoneValido } from "../utils/validacoes";

export const schemaConsulta = yup.object({
    historico: yup.string().trim().required("Informe o histórico / motivo da consulta."),
    dtConsulta: yup
        .string()
        .required("Informe a data da consulta.")
        .test("data-valida", "Data inválida, use o formato DD/MM/AAAA.", (v) => !!v && dataValida(v)),
    hrConsulta: yup
        .string()
        .required("Informe o horário da consulta.")
        .test("hora-valida", "Horário inválido, use o formato HH:MM.", (v) => !!v && horaValida(v)),
});

export const schemaResponsavel = yup.object({
    nmResponsavel: yup.string().trim().required("Informe o nome do responsável."),
    cpfResponsavel: yup
        .string()
        .required("Informe o CPF do responsável.")
        .test("cpf-valido", "CPF inválido, informe os 11 dígitos.", (v) => !!v && cpfValido(v)),
    telefoneResponsavel: yup
        .string()
        .required("Informe o telefone do responsável.")
        .test("telefone-valido", "Telefone inválido.", (v) => !!v && telefoneValido(v)),
});

export const schemaAnimal = yup.object({
    nmAnimal: yup.string().trim().required("Informe o nome do animal."),
    especieAnimal: yup.string().trim().required("Informe a espécie do animal."),
});

export const schemaNovaConsulta = schemaConsulta.concat(schemaResponsavel).concat(schemaAnimal);
export const schemaEditarConsulta = schemaConsulta;
