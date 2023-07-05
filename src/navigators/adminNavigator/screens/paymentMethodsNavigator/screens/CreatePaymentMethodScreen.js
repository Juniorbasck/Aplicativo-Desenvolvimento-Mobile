import React, { useState } from 'react';
import {
    View,
    ScrollView,
    TextInput,
    StyleSheet
} from 'react-native';
import AdminButton from '../../../components/AdminButton';

const CreatePaymentMethodScreen = ({route, navigation}) => {
    const {
        container,
        textInput,
        createStyle,
    } = styles;

    const createPaymentMethod = () => {
        console.log('CREATE PAYMENT METHOD');
        navigation.goBack();
    };

    const [paymentMethod, setPaymentMethod] = useState('');

    return (
        <View style={container}>
            <ScrollView
                keyboardDismissMode='on-drag'
            >
                <TextInput
                    autoFocus={true}
                    style={textInput}
                    defaultValue={paymentMethod}
                    onChangeText={text => setPaymentMethod(text)}
                    placeholder='Método de Pagamento'
                />
                <AdminButton
                    text={'Criar'}
                    onPress={createPaymentMethod}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        backgroundColor: 'white',
        width: 350,
        height: 50,
        marginVertical: 15,
        padding: 15,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 5
    },
    createStyle: {
        textDecorationLine: 'underline',
        textAlign: 'center'
    },
    dropdownStyle: {
        alignItems: 'flex-start'
    }
});

export default CreatePaymentMethodScreen;
