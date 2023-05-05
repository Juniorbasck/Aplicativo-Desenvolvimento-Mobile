import React, { useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Alert
} from 'react-native';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';
import { CustomTextInput } from '../components/input/CustomTextInput';
import { TermsAndConditions } from '../components/terms_and_conditions/TermsAndConditions'; 
import { CustomButton } from '../components/button/CustomButton';
import { validateEmail, validatePassword, validateTextField } from '../utils/Validator';
import { ResponsiveDimensions } from '../utils/ResponsiveDimensions';

function validateData(name, surname, username, email, password, confirmPassword) {
    let message = {};
    if (validateTextField(name) && validateTextField(surname) && validateTextField(username)) {
        if (validateEmail(email)) {
            if (validatePassword(password)) {
                if (password === confirmPassword) {
                    message.header = 'Sucesso!';
                    message.body = 'Sua conta foi criada com sucesso!';
                    // return 'Conta criada com sucesso!'
                } else {
                    message.header = 'Palavra-passe e Confirmação';
                    message.body = 'A palavra passe e confirmação da palavra-passe diferem!';
                    // return 'A palavra passe e confirmar palavra-passe diferem!'
                }
            } else {
                message.header = 'Palavra-passe';
                message.body = 'A palavra-passe deve ter no mínimo 6 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 caracter especial!';
                // return 'A palavra-passe deve ter no mínimo 6 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 caracter especial!';
            }
        } else {
            message.header = 'E-mail';
            message.body = 'E-mail inválido!';
            // return 'E-mail inválido!';
        }
    } else {
        message.header = 'Campo de Texto';
        message.body = 'Campo de texto inválido!';
        // return 'Campo de texto inválido!';
    }
    return message;
}

const CreateAccountScreen = ({navigation}) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checked, setChecked] = useState(false);

    return (
        <View style={styles.outerContainer}>
            <ScrollView 
                keyboardDismissMode={'on-drag'}
                contentContainerStyle={styles.scrollView}
            >
                <View style={[styles.marginPaddingDefault, {marginTop: 30}]}>
                    <Text style={[Fonts.displaySmall, {color: Colors.onSecondaryKeyColor}]}>Criar Conta</Text>
                </View>
                <View style={[styles.marginPaddingDefault, {flexDirection: 'row'}]}>
                    <CustomTextInput
                        placeholder={'Nome'}
                        setState={setName}
                    />
                    <CustomTextInput
                        placeholder={'Apelido'}
                        setState={setSurname}
                    />                    
                </View>
                <View style={styles.marginPaddingDefault}>
                    <CustomTextInput
                        placeholder={'Nome de utilizador'}
                        size={'big'}
                        setState={setUsername}
                    />
                </View>
                <View style={styles.marginPaddingDefault}>
                    <CustomTextInput
                        placeholder={'E-mail'}
                        size={'big'}
                        setState={setEmail}
                        keyboardType={'email-address'}
                    />
                </View>
                <View style={styles.marginPaddingDefault}>
                    <CustomTextInput
                        placeholder={'Palavra-passe'}
                        size={'big'}
                        setState={setPassword}
                        hide={true}
                    />
                </View>
                <View style={styles.marginPaddingDefault}>
                    <CustomTextInput
                        placeholder={'Confirmar palavra-passe'}
                        size={'big'}
                        setState={setConfirmPassword}
                        hide={true}
                    />
                </View>
                <TermsAndConditions
                    setState={setChecked}
                />
                <View style={{marginTop: 30}}>
                    <CustomButton
                        text={'Criar'}
                        onPress={() => {
                            let res = validateData(name, surname, username, email, password, confirmPassword);
                            Alert.alert(res.header, res.body);
                            if (res.header == 'Conta criada com sucesso!') {
                                // Save account data to database.
                                // Log user in.
                            }
                        }}
                        backgroundColor={checked ? Colors.tertiaryKeyColor : Colors.tertiaryKeyColorDisabled}
                        textColor={Colors.onPrimaryKeyColor}
                        widthPercentage={95}
                        disabled={!checked}
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
        alignItems: 'center',
        marginTop: ResponsiveDimensions.screen.defaultMarginTop,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        backgroundColor: Colors.secondaryKeyColor
    },
    marginPaddingDefault: {
        margin: 10,
        padding: 10,
    }
});

export { CreateAccountScreen };
