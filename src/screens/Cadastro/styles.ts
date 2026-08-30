import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({
  // Fundo da tela
  containerTela: {
    flex: 1,
    backgroundColor: colors.white,
  },

  // Área que rola quando o teclado aparece
  containerScroll: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
    paddingVertical: 24,
  },

  // Card onde fica o formulário
  containerFormulario: {
    backgroundColor: colors.white,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.grayLight,
    padding: 24,
    elevation: 4,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
  },

  // Título e subtítulo do formulário
  containerTextos: {
    alignItems: "center",
    marginBottom: 24,
  },

  // Título principal
  textoTitulo: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.dark,
  },

  // Texto abaixo do título
  textoSubtitulo: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 4,
  },

  // Espaço entre os campos
  containerInputs: {
    gap: 4,
  },

  // Botão de esquecer senha
  botaoEsqueceuSenha: {
    alignSelf: "center",
    marginTop: 4,
    marginBottom: 8,
  },

  // Texto de esquecer senha
  textoEsqueceuSenha: {
    color: colors.gray,
    fontSize: 13,
  },

  // Botão para entrar
  botaoEntrar: {
    backgroundColor: colors.bluePrimary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
    elevation: 4,
    shadowColor: colors.bluePrimary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },

  // Texto do botão de entrar
  textoBotaoEntrar: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  // Área para ir até o cadastro
  botaoCadastro: {
    alignItems: "center",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.grayLight,
  },

  // Texto da mensagem de cadastro
  textoCadastro: {
    fontSize: 14,
    color: colors.gray,
  },

  // Parte azul do “Cadastre-se”
  textoCadastroDestaque: {
    color: colors.bluePrimary,
    fontWeight: "700",
  },
});