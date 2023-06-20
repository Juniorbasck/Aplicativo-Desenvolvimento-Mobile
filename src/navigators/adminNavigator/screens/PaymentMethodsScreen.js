import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const PaymentMethodsScreen = () => {
    const {
        container
    } = styles;

    return (
        <View style={container}>
            <Text>Metodos de Pagamento</Text>
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

export default PaymentMethodsScreen;
