import React from 'react';
import {
    TouchableHighlight,
    Text,
    StyleSheet
} from 'react-native';

const AdminButton = ({
    text, 
    onPress, 
    backgroundColor = '#0077ff',
    underlayColor = '#96c5fa'
}) => {
    const {
        btnStyle,
        btnText
    } = styles;

    return (
        <TouchableHighlight
            style={[btnStyle, {backgroundColor: backgroundColor}]}
            onPress={onPress}
            underlayColor={underlayColor}
        >
            <Text style={btnText}>{text}</Text>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    btnStyle: {
        padding: 10,
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
        textAlignVertical: 'center'
    }
});

export default AdminButton;
