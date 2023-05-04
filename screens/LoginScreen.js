import React from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { CustomButton } from '../components/button/CustomButton';

const LoginScreen = ({navigation}) => {
    return (
        <View style={styles.outerContainer}>
            <CustomButton
                text={'Ir para criar conta'}
                onPress={() => navigation.navigate('CreateAccount')}
                backgroundColor={'gray'}
                textColor={'white'}
                widthPercentage={61}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export { LoginScreen };
