import { TextInputProps } from 'react-native';

// estende as props padrão do TextInput com as customizações do componente
export interface CustomTextInputProps extends Omit<TextInputProps, 'placeholder'> {
    title?: string; // label acima do input
    placeholder?: string; // texto de placeholder
    leftIconName?: string; // nome do ícone da esquerda (Ionicons)
    rightIconName?: string; // nome do ícone da direita (Ionicons)
    leftIconColor?: string; // cor do ícone esquerdo
    rightIconColor?: string; // cor do ícone direito
    titleStyle?: any; // estilo customizado do título
    containerStyle?: any; // estilo customizado do container externo
    onRightIconPress?: () => void; // função chamada ao clicar no ícone direito
    rightIconType?: 'button' | 'decoration'; // button = clicável, decoration = só visual
}