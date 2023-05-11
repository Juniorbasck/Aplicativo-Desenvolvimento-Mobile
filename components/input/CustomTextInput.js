import React, { useState } from 'react';
import { TextInput, StyleSheet} from 'react-native';
import { Colors } from '../../utils/Colors';

const CustomTextInput = ({state, setState, placeholder='', size='small', keyboardType='ascii-capable', hide=false}) => {
    return ( 
        <TextInput
            placeholder={placeholder}
            keyboardType={keyboardType}
            secureTextEntry={hide}
            placeholderTextColor={Colors.onSecondaryKeyColor}
            defaultValue={state}
            style={[styles.textInput, size == 'small' ? {width: '50%'} : {width: '83%'}]}
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
        padding: '2%',
    }
});

export { CustomTextInput };
