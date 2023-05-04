import React, { useState } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Colors } from '../../utils/Colors';
import { ResponsiveDimensions } from '../../utils/ResponsiveDimensions';
import { Fonts } from '../../utils/Fonts';
import Ionicons from '@expo/vector-icons/Ionicons';

const CustomCheckBox = (
    {
        text='', textPosition='right', textUnderline=false, useBorder=false,
        textBold=false, shape='square', onCheckedBackgroundColor=Colors.onPrimaryKeyColor,
        onUncheckedBackgroundColor=Colors.onPrimaryKeyColor, onCheckedIcon='checked', 
        onUncheckedIcon='', setState
    }
) => {
    const [checked, toggleCheckbox] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(onUncheckedBackgroundColor);
    const [icon, setIcon] = useState(onUncheckedIcon);

    const textComponent = () => {
        return (
            <Text style={
                [
                    styles.text,
                    textUnderline ? {textDecorationLine: 'underline'} : {},
                    textBold ? {fontWeight: 'bold'} : {}, 
                    Fonts.bodyMedium
                ]
            }
            >{text}</Text>
        );
    }

    return (
        <View style={styles.container}>
            {
                textPosition === 'left' && textComponent()
            }
            <Pressable
                style={
                    [
                        styles.pressable, 
                        useBorder ? {borderColor: Colors.onSecondaryKeyColor, borderWidth: 1} : {},
                        {
                            backgroundColor: backgroundColor,
                        },
                        shape === 'square' ? {
                            width: ResponsiveDimensions.customCheckbox.square.width,
                            height: ResponsiveDimensions.customCheckbox.square.height,
                        } : shape === 'circle' ? {
                            width: ResponsiveDimensions.customCheckbox.circle.width,
                            height: ResponsiveDimensions.customCheckbox.circle.height,
                            borderRadius: 100
                        } : {}
                    ]
                }
                onPress={() => {
                    toggleCheckbox(!checked);
                    if (checked) {
                        setBackgroundColor(onCheckedBackgroundColor);
                        setState('checked');
                        setIcon('checkmark');
                    } else {
                        setBackgroundColor(onUncheckedBackgroundColor);
                        setState('unchecked');
                        setIcon('');
                    }
                }}
            >
                <Ionicons name={icon} size={20}/>
            </Pressable>
            {
                textPosition === 'right' && textComponent()
            }
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    pressable: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        margin: 10
    }
});

export { CustomCheckBox };
