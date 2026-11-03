import { Ionicons } from "@expo/vector-icons";

type NomeIcone = keyof typeof Ionicons.glyphMap;

// props do item de lista
export interface ItemListaProps {
    inicial: string;
    cor: string;
    titulo: string;
    textoDireita?: string;
    subtitulo?: string;
    selo?: string;
    detalhe?: string;
    acao?: { icone: NomeIcone; cor: string; onPress: () => void };
    variante?: "lista" | "cartao";
    onPress: () => void;
}
