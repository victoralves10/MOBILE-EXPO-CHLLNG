import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	// Container principal da tela
	containerTela: {
		flex: 1,
	},

	// Parte de cima (imagem)
	containerTopo: {
		flex: 3,
	},

	// Parte de baixo (formulário)
	containerFormulario: {
		flex: 7,
		justifyContent: "flex-start",
		alignItems: "center",
		paddingHorizontal: 24,
		paddingTop: 20,
	},

	// Imagem de topo
	imagemLogo: {
		width: "100%",
		height: "100%",
		resizeMode: "cover",
	},

	// Título "Login"
	textoTitulo: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#3E60DD",
		marginBottom: 24,
	},

	// Container de cada input (label + campo)
	containerInput: {
		width: "100%",
        marginBottom: 20,
	},

	// Texto acima do input
	textoLabel: {
		fontSize: 14,
		color: "#3E60DD",
		marginBottom: 6,
		fontWeight: "600",
	},

	// Campo de digitação
	campoInput: {
		width: "100%",
		borderWidth: 1.5,
		borderColor: "#B9C4CA",
		borderRadius: 8,
		padding: 14,
		fontSize: 16,
		color: "#333",
	},

	// Botão de login
	botaoEntrar: {
		width: "100%",
		backgroundColor: "#3E60DD",
		padding: 16,
		borderRadius: 8,
		alignItems: "center",
		marginTop: 100,
	},

	// Texto dentro do botão
	textoBotao: {
		color: "white",
		fontSize: 16,
		fontWeight: "bold",
	},

	// Texto de links (ex: esqueci senha)
	textoLink: {
		fontSize: 14,
		color: "#888",
		textAlign: "right",
	},

	// Parte destacada do link (ex: cadastre-se)
	textoLinkDestaque: {
		color: "#3E60DD",
		fontWeight: "bold",
	},
});