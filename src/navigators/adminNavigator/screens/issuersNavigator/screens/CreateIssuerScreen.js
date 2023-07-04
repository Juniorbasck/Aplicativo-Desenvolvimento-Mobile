import React, { useState } from 'react';
import {
    View,
    ScrollView,
    TextInput,
    StyleSheet
} from 'react-native';
import CustomDropdown from '../../../../../components/CustomDropdown';
import AdminButton from '../../../components/AdminButton';

const CreateIssuerScreen = ({route, navigation}) => {
    const { paymentMethods } = route.params;

    const {
        container,
        textInput,
        dropdownStyle
    } = styles;

    const createIssuer = () => {
        console.log('CREATE ISSUER');
        navigation.goBack();
    };

    const [issuer, setIssuer] = useState('');
    const [dpm, setDpm] = useState(1);

    return (
        <View style={container}>
            <ScrollView
                keyboardDismissMode='on-drag'
            >
                <TextInput
                    autoFocus={true}
                    style={textInput}
                    defaultValue={issuer}
                    onChangeText={text => setIssuer(text)}
                    placeholder='Emissor'
                />
                <View style={dropdownStyle}>
                    <CustomDropdown
                        state={dpm}
                        setState={setDpm}
                        options={paymentMethods}
                        width={43}
                        marginBottom={3}
                    />
                </View>
                <AdminButton
                    text={'Criar'}
                    onPress={createIssuer}
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
        borderColor: 'grey',
        borderWidth: .5
    },
    dropdownStyle: {
        alignItems: 'flex-start'
    }
});

export default CreateIssuerScreen;
