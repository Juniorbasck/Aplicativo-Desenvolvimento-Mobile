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
import { Icon } from 'react-native-vector-icons/Icon';


const CustomCheckBox = (
    {
        text='', textPosition='right', textUnderline=false, useBorder=false,
        textBold=false, shape='square', onCheckedBackgroundColor=Colors.onSecondaryKeyColor,
        onUncheckedBackgroundColor=Colors.onPrimaryKeyColor, onCheckedIcon=null, 
        onUncheckedIcon=null, setState
    }
) => {
    const [checked, toggleCheckbox] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState(onUncheckedBackgroundColor);

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
                        useBorder ? {borderColor: Colors.onSecondaryKeyColor, borderWidth: 2} : {},
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
                    } else {
                        setBackgroundColor(onUncheckedBackgroundColor);
                        setState('unchecked');
                    }
                }}
            >
            <Icon name='rocket'/>
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
        margin: 10
    },
    text: {
        margin: 10
    }
});

export { CustomCheckBox };
