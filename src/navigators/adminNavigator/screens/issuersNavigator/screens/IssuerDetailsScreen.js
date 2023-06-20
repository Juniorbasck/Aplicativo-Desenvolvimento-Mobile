import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const IssuerDetailsScreen = () => {
    const {
        container
    } = styles;

    return (
        <View style={container}>
            <Text>Detalhes de Emissor</Text>
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

export default IssuerDetailsScreen;
