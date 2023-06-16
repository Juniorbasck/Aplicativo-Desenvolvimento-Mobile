import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Dimensions,
    Pressable
} from 'react-native';
import Colors from '../utils/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';

const PasswordInput = ({
        state, 
        setState, 
        width=90, 
        marginTop=2, 
        marginBottom=2,
        editable=true,
        placeholder='Palavra-passe',
        autofocus=false,
        setRef=null,
        onSubmitEditing=null,
        blurOnSubmit=true,
        pullBack=false
}) => {
    const [passwordIcon, setPasswordIcon] = useState('eye');

    return (
        <View style={[
            styles.container,
            {
                width: width / 100 * Dimensions.get('window').width,
                marginTop: marginTop / 100 * Dimensions.get('window').height,
                marginBottom: marginBottom / 100 * Dimensions.get('window').height
            },
            pullBack ? {zIndex: -10} : {}
        ]}>
            <TextInput
                style={{flex: 1}}
                placeholder={placeholder}
                placeholderTextColor='grey'
                defaultValue={state}
                onChangeText={text => setState(text)}
                secureTextEntry={ passwordIcon === 'eye' ? true : false }
                editable={editable}
                autoFocus={autofocus}
                ref={setRef == null ? null : input => setRef(input)}
                onSubmitEditing={onSubmitEditing}
                blurOnSubmit={blurOnSubmit}
            />
            <Pressable 
                onPress={() => setPasswordIcon( passwordIcon === 'eye' ? 'eye-off' : 'eye' )}
            >
                <Ionicons name={passwordIcon} size={24} color='black'/>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.secondaryKeyColor,
        borderColor: Colors.onSecondaryKeyColor,
        borderWidth: 1,
        borderRadius: 5,
        padding: '2%',
        marginHorizontal: '2%',
    }
});

export default PasswordInput;
