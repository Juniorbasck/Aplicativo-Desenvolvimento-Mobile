import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const UserDetailsScreen = ({navigation}) => {

    useEffect(() => {
        navigation.setOptions();
    }, []);

    useEffect(() => navigation.addListener('beforeRemove', e => {
    }), [navigation]);

    const {
        container
    } = styles;

    return (
        <View style={container}>
            <Text>Detalhes de Usuario</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default UserDetailsScreen;
