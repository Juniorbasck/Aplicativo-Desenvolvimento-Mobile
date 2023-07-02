import React from 'react';
import {
    Text,
    StyleSheet,
    Pressable
} from 'react-native';
import TextRow from './TextRow';

const UserCard = props => {
    const { 
        id,
        name, 
        surname, 
        email,
        username,
    } = props.data;

    const { onPress, onLongPress } = props;
    
    const {
        pressable,
        idStyle
    } = styles;

    return (
        <Pressable
            style={pressable}
            onPress={_ => onPress(props.data)}
            onLongPress={_ => onLongPress(props.data)}
        >   
            <Text style={idStyle}>{id}</Text>
            <TextRow
                label={'Nome'}
                text={name}
            />
            <TextRow
                label={'Apelido'}
                text={surname}
            />
            <TextRow
                label={'Nome de utilizador'}
                text={username}
            />
            <TextRow
                label={'E-mail'}
                text={email}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    pressable: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: '5%',
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: .5
    },
    idStyle: {
        alignSelf: 'flex-end',
        fontWeight: 'bold'
    }
});

export default UserCard;
