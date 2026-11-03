import { Ionicons } from "@expo/vector-icons";

// opção de aba
export interface FiltroTabsOpcao<T extends string> {
    valor: T;
    label: string;
    cor: string;
    icone?: keyof typeof Ionicons.glyphMap;
}

export interface FiltroTabsProps<T extends string> {
    opcoes: FiltroTabsOpcao<T>[];
    valorSelecionado: T;
    onSelecionar: (valor: T) => void;
}
