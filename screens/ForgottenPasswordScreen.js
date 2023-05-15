import React, { useState } from 'react';
import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    Image,
    Alert
} from 'react-native';
import { CustomButton } from '../components/CustomButton';
import { CustomTextInput } from '../components/CustomTextInput';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';
import { ResponsiveDimensions } from '../utils/ResponsiveDimensions';
import { validateEmail } from '../utils/Validator';

const ForgottenPasswordScreen = ({navigation}) => {
    const [email, setEmail] = useState('');

    return (
        <View style={styles.outerContainer}>
            <ScrollView 
                keyboardDismissMode={'on-drag'}
                contentContainerStyle={styles.scrollView}
            >
                <View style={styles.marginPaddingDefault}>
                    <Text style={[styles.title, Fonts.displaySmall]}>Esqueceu Palavra-Passe</Text>
                </View>
                <View style={styles.marginPaddingDefault}>
                    <Image
                        source={require('../assets/difficulties.png')}
                        resizeMode={'contain'}
                        style={styles.image}
                    />
                </View>
                <View style={styles.marginPaddingDefault}>
                    <Text style={[styles.subtitle, Fonts.bodyLarge]}>Indique o seu e-mail para receber as instruções para recuperar a palavra-passe</Text>
                </View>
                <CustomTextInput
                    placeholder={'E-mail'}
                    keyboardType={'email-address'}
                    widthPercentage={90}
                    state={email}
                    setState={setEmail}
                />
                <View style={styles.marginPaddingDefault}>
                    <CustomButton
                        text={'Enviar'}
                        textColor={Colors.onPrimaryKeyColor}
                        onPress={() => {
                            if (validateEmail(email)) {
                                Alert.alert(
                                    'Recuperação de Palavra-Passe', 
                                    `Um e-mail contendo instruções para a recuperação da palavra-passe foi enviado com sucesso para ${email}`
                                );
                            } else {
                                Alert.alert('E-mail', 'E-mail inválido!');
                            }
                            
                        }}
                        backgroundColor={Colors.tertiaryKeyColor}
                        widthPercentage={90}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        backgroundColor: Colors.primaryKeyColor
    },
    scrollView: {
        height: ResponsiveDimensions.screen.height,
        width: ResponsiveDimensions.screen.width,
        marginTop: ResponsiveDimensions.screen.defaultMarginTop,
        alignItems: 'center',
    },
    marginPaddingDefault: {
        margin: 10,
        padding: 10
    },
    title: {
        color: Colors.onPrimaryKeyColor,
        textAlign: 'center'
    },
    image: {
        width: ResponsiveDimensions.smallSquareImageContainer.width,
        height: ResponsiveDimensions.smallSquareImageContainer.height
    },
    subtitle: {
        color: Colors.onPrimaryKeyColor,
        textAlign: 'center'
    }
});

export { ForgottenPasswordScreen };
