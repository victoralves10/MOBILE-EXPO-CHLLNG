import { TextInputProps } from 'react-native';

export interface CustomTextInputProps extends Omit<TextInputProps, 'placeholder'> {
    title?: string;
    placeholder?: string;
    leftIconName?: string;
    rightIconName?: string;
    leftIconColor?: string;
    rightIconColor?: string;
    titleStyle?: any;
    containerStyle?: any;
    onRightIconPress?: () => void;
    rightIconType?: 'button' | 'decoration';
}