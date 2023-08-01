import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native';
import AdminButton from '../../../components/AdminButton';

const MyProfileScreen = () => {
    const { 
        container,
        buttonContainer
    } = styles;

    return (
        <View style={container}>
            <View style={container}>
                <Text>Meu Perfil</Text>
            </View>
            <View style={buttonContainer}>
                <AdminButton
                    text={'Sair'}
                    onPress={() => {

                        }
                    }
                    backgroundColor='#990f00'
                    underlayColor='#ff1900'
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        width: Dimensions.get('window').width * .9,
        marginBottom: 15
    }
});

export default MyProfileScreen;
