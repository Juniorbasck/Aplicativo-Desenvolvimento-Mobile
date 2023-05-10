import React, { useState } from 'react';

import { TextInput, StyleSheet} from 'react-native';

import { Colors } from '../../utils/Colors';
import { ResponsiveDimensions } from '../../utils/ResponsiveDimensions';

const CustomTextInput = ({setState, value='',placeholder='', size='small', keyboardType='ascii-capable', hide=false}) => {
    return ( 
        <TextInput
            placeholder={placeholder}
            keyboardType={keyboardType}
            secureTextEntry={hide}
            placeholderTextColor={Colors.onSecondaryKeyColor}
            value={value}
            style={
                [
                    styles.textInput, 
                    {
                        width: ResponsiveDimensions.customTextInput[size].width, 
                        height: ResponsiveDimensions.customTextInput[size].height
                    }
                ]
            }
            onChangeText={(text) => setState(text)}
        />
    );
}

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: Colors.secondaryKeyColor,
        borderColor: Colors.onSecondaryKeyColor,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 8,
        marginLeft: 8
    }
});

export { CustomTextInput };
