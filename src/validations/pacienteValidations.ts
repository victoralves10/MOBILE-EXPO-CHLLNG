import * as yup from "yup";
import { cpfValido, telefoneValido } from "../utils/validacoes";

export const schemaEditarPaciente = yup.object({
    nmAnimal: yup.string().trim().required("Informe o nome do animal."),
    especieAnimal: yup.string().trim().required("Informe a espécie do animal."),
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
