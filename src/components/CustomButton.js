import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import { ResponsiveDimensions } from '../utils/ResponsiveDimensions';
import Fonts from '../utils/Fonts';

const CustomButton = (
    {
        text, 
        onPress, 
        backgroundColor, 
        textColor='white', 
        width=88, 
        disabled=false
    }
) => {

    return (
        <TouchableOpacity
            style={
                [
                    styles.button, 
                    {
                        backgroundColor: backgroundColor, 
                        width: width / 100 * Dimensions.get('window').width
                    }
                ]
            }
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={
                [
                    Fonts.headlineSmall, 
                    {
                        color: textColor
                    }, 
                    styles.text
                ]
            }>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        height: ResponsiveDimensions.customButton.height,
        borderRadius: 20,
        margin: '2.5%',
    },
    text: {
        textAlign: 'center',
    }
});

export default CustomButton;
