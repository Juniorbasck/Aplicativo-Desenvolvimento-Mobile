import React from 'react';
import {
    TouchableHighlight,
    Text,
    StyleSheet
} from 'react-native';

const AdminButton = ({text, onPress}) => {
    const {
        btnStyle,
        btnText
    } = styles;

    return (
        <TouchableHighlight
            style={btnStyle}
            onPress={onPress}
            underlayColor={'#96c5fa'}
        >
            <Text style={btnText}>{text}</Text>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    btnStyle: {
        backgroundColor: '#0077ff',
        padding: 10,
        borderRadius: 10,
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
