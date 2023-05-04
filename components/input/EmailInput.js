import React, { useState } from 'react';

import {
    TextInput,
    StyleSheet,
} from 'react-native';

import { Colors } from '../../utils/Colors';
import { ResponsiveDimensions } from '../../utils/ResponsiveDimensions';

const EmailInput = ({loginScreen=false, setState}) => {
    return ( 
        <TextInput
            placeholder={placeholder}
            keyboardType={'email-address'}
            placeholderTextColor={Colors.onSecondaryKeyColor}
            style={
                [
                    styles.emailInput, 
                    {
                        width: ResponsiveDimensions.customTextInput['big'].width, 
                       
                    }
                ]
            }
            onChangeText={(text) => setState(text)}
        />
    );
}

const styles = StyleSheet.create({
    emailInput: {
        backgroundColor: Colors.secondaryKeyColor,
        borderColor: Colors.onSecondaryKeyColor,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 8,
        marginLeft: 8,
        height: ResponsiveDimensions.customTextInput['big'].height
    }
});

export { EmailInput };
