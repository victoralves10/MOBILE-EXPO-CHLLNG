import React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';
import type { CustomTextInputProps } from './types';

const CustomTextInput: React.FC<CustomTextInputProps> = ({

    title,
    placeholder = '',
    leftIconName,
    rightIconName,
    leftIconColor = '#666',
    rightIconColor = '#666',
    titleStyle,
    containerStyle,
    onRightIconPress,
    rightIconType = 'decoration',
    style,
    ...inputProps

}) => {

    return (

        <View style={[styles.container, containerStyle]}>

            {title && (<Text style={[styles.title, titleStyle]}>{title}</Text>)}

            <View style={styles.inputContainer}>
                {leftIconName && (
                    <Ionicons
                        name={leftIconName as any}
                        size={20}
                        color={leftIconColor}
                        style={styles.leftIcon}
                    />
                )}

                <TextInput
                    style={[
                        styles.input,
                        leftIconName && styles.inputWithLeftIcon,
                        style
                    ]}
                    placeholder={placeholder}
                    placeholderTextColor="#999"
                    {...inputProps}
                />

                {rightIconName && (
                    <TouchableOpacity
                        onPress={rightIconType === 'button' ? onRightIconPress : undefined}
                        style={[
                            styles.rightIconContainer,
                            rightIconType === 'button' && styles.rightIconButton
                        ]}
                        activeOpacity={0.7}
                    >
                        <Ionicons
                            name={rightIconName as any}
                            size={20}
                            color={rightIconColor}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default CustomTextInput;