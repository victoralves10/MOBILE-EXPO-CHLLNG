import { Ionicons } from "@expo/vector-icons";

type NomeIcone = keyof typeof Ionicons.glyphMap;

// tudo que o item de lista pode mostrar, cada tela passa só o que precisa
export interface ItemListaProps {
    inicial: string; // letra dentro da bolinha
    cor: string; // cor da bolinha, do ponto e do selo
    titulo: string; // linha de cima em negrito (ex: nome do animal)
    textoDireita?: string; // texto pequeno no canto de cima (ex: data)
    subtitulo?: string; // segunda linha (ex: motivo da consulta)
    selo?: string; // etiqueta colorida no canto de baixo (ex: "Agendado")
    detalhe?: string; // terceira linha, mais clarinha (ex: espécie e raça)
    acao?: { icone: NomeIcone; cor: string; onPress: () => void }; // botão redondo da direita
    variante?: "lista" | "cartao"; // lista = linha com divisória, cartao = card com sombra (carrossel)
    onPress: () => void;
}