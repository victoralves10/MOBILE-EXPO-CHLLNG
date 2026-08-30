import { StyleSheet } from "react-native";
import { colors } from "../../global/colors";

export const styles = StyleSheet.create({
  // Fundo da tela toda
  containerTela: {
    flex: 1,
    backgroundColor: colors.white,
  },

  // Parte principal da tela, deixando o conteúdo no meio
  containerConteudo: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 28,
  },

  // Junta o ícone, nome e subtítulo do app
  containerLogo: {
    alignItems: "center",
    marginBottom: 36,
    gap: 8,
  },

  // Círculo azul que fica atrás do ícone
  circuloLogo: {
    width: 88,
    height: 88,
    borderRadius: 24,
    backgroundColor: colors.bluePrimary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
    elevation: 8,
    shadowColor: colors.bluePrimary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
  },

  // Nome do app
  textoMarca: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.blueDark,
    letterSpacing: 1,
  },

  // Parte do nome que fica mais destacada
  textoMarcaDestaque: {
    fontWeight: "900",
    color: colors.bluePrimary,
  },

  // Linhazinha azul abaixo do nome
  linhaDecorativa: {
    width: 48,
    height: 3,
    backgroundColor: colors.bluePrimary,
    borderRadius: 2,
    marginTop: 4,
  },

  // Texto pequeno abaixo do nome do app
  textoMarcaSub: {
    fontSize: 11,
    color: colors.gray,
    letterSpacing: 2,
    textTransform: "uppercase",
  },

  // Card onde fica o formulário de login
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

  // Junta o título e o subtítulo do formulário
  containerTextos: {
    alignItems: "center",
    marginBottom: 24,
  },

  // Título de boas-vindas
  textoTitulo: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.dark,
  },

  // Texto logo abaixo do título
  textoSubtitulo: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 4,
  },

  // Espaço entre os campos de texto
  containerInputs: {
    gap: 4,
  },

  // Posição do botão de esquecer senha
  botaoEsqueceuSenha: {
    alignSelf: "center",
    marginTop: 4,
    marginBottom: 8,
  },

  // Texto do botão de esquecer senha
  textoEsqueceuSenha: {
    color: colors.gray,
    fontSize: 13,
  },

  // Botão para entrar na conta
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

  // Texto dentro do botão de entrar
  textoBotaoEntrar: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  // Área do botão para criar conta
  botaoCadastro: {
    alignItems: "center",
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.grayLight,
  },

  // Texto normal do botão de cadastro
  textoCadastro: {
    fontSize: 14,
    color: colors.gray,
  },

  // Parte colorida do texto “Cadastre-se”
  textoCadastroDestaque: {
    color: colors.bluePrimary,
    fontWeight: "700",
  },
});