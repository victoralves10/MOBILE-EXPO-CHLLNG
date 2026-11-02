import { Ionicons } from "@expo/vector-icons";

// uma opção de aba do filtro
export interface FiltroTabsOpcao<T extends string> {
    valor: T;
    label: string;
    cor: string; // cor de destaque quando a aba está ativa
    icone?: keyof typeof Ionicons.glyphMap; // ícone opcional antes do texto
}

export interface FiltroTabsProps<T extends string> {
    opcoes: FiltroTabsOpcao<T>[];
    valorSelecionado: T;
    onSelecionar: (valor: T) => void;
}
