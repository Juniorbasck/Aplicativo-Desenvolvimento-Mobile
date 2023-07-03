import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    TextInput,
    Text
} from 'react-native';

const CreateCityScreen = ({route, navigation}) => {
    const [city, setCity] = useState('');

    const {
        container,
        textInput,
        createStyle
    } = styles;

    const createCity = _ => {
        console.log('CREATE CITY');
        navigation.goBack();
    };

    return (
        <View style={container}>
            <ScrollView
                keyboardDismissMode='on-drag'
            >
                <TextInput
                    autoFocus={true}
                    style={textInput}
                    defaultValue={city}
                    onChangeText={text => setCity(text)}
                    placeholder='Cidade'
                />
                <Text
                    style={createStyle}
                    onPress={createCity}
                >
                    Criar
                </Text>
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
    createStyle: {
        textDecorationLine: 'underline',
        textAlign: 'center'
    }
});

export default CreateCityScreen;
