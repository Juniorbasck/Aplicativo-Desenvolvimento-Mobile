import { useState, useEffect } from 'react';
import {
    ScrollView,
    View,
    StyleSheet,
    Alert,
    Dimensions
} from 'react-native';
import { Colors } from '../utils/Colors';
import { CustomTextInput } from '../components/CustomTextInput';
import { TermsAndConditions } from '../components/TermsAndConditions'; 
import { CustomButton } from '../components/CustomButton';
import { 
    validateEmail, 
    validatePassword, 
    validateTextField 
} from '../utils/Validator';
import { PasswordInput } from '../components/PasswordInput';
import { StackActions } from '@react-navigation/native';

function validateData(name, surname, username, email, password, confirmPassword) {
    let message = {};
    if (validateTextField(name) && validateTextField(surname) && validateTextField(username)) {
        if (validateEmail(email)) {
            if (validatePassword(password)) {
                if (password === confirmPassword) {
                    message.header = 'Validação de E-mail';
                    message.body = `Um e-mail contendo um código de validação foi enviado com sucesso para ${email}!`;
                    // return 'Conta criada com sucesso!'
                } else {
                    message.header = 'Palavra-passe e Confirmação';
                    message.body = 'A palavra passe e confirmação da palavra-passe diferem!';
                    // return 'A palavra passe e confirmar palavra-passe diferem!'
                }
            } else {
                message.header = 'Palavra-Passe';
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

const CreateAccountScreen = ({route, navigation}) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checked, setChecked] = useState(false);

    const [avoidUseEffect, setAvoidUseEffect] = useState(false);

    useEffect(() => navigation.addListener('beforeRemove', e => {
        let action = e.data.action;
        if (!avoidUseEffect) {
            e.preventDefault();
            Alert.alert(
                'Criação de Conta',
                'Se voltares os dados serão perdidos. Desejas realmente fazer isso?',
                [
                    {
                        text: 'Sim',
                        style: 'destructive',
                        onPress: () => navigation.dispatch(action)
                    }, 
                    {
                        text: 'Não',
                        style: 'cancel',
                        onPress: () => {}
                    }
                ]
            );
        }
    }), [navigation, avoidUseEffect]);

    return (
        <View style={styles.outerContainer}>
            <ScrollView 
                keyboardDismissMode={'on-drag'}
                contentContainerStyle={styles.scrollView}
            >
                <View style={styles.nameSurnameContainer}>
                    <CustomTextInput
                        placeholder={'Nome'}
                        state={name}
                        setState={setName}
                        autofocus={true}
                    />
                    <CustomTextInput
                        placeholder='Apelido'
                        state={surname}
                        setState={setSurname}
                    />                    
                </View>
                <CustomTextInput
                    placeholder={'Nome de utilizador'}
                    widthPercentage={90}
                    state={username}
                    setState={setUsername}
                    marginBottomPercentage={3}
                />
                <CustomTextInput
                    placeholder={'E-mail'}
                    widthPercentage={90}
                    state={email}
                    setState={setEmail}
                    keyboardType={'email-address'}
                    marginBottomPercentage={5}
                />
                <PasswordInput
                    state={password}
                    setState={setPassword}
                    widthPercentage={90}
                    marginBottomPercentage={5}
                />
                <PasswordInput
                    state={confirmPassword}
                    setState={setConfirmPassword}
                    widthPercentage={90}
                    marginBottomPercentage={5}
                    placeholder='Confirmar palavra-passe'
                />
                <TermsAndConditions
                    setState={setChecked}
                />
                <View style={{marginTop: '10%'}}>
                    <CustomButton
                        text={'Criar'}
                        onPress={() => {
                            let res = validateData(name, surname, username, email, password, confirmPassword);
                            if (res.header == 'Validação de E-mail') {
                                setAvoidUseEffect(true);
                                Alert.alert(
                                    res.header, 
                                    res.body,
                                    [
                                        {
                                            text: 'Ok',
                                            onPress: () => navigation.dispatch(StackActions.replace('ValidationCode', { email: email }))
                                        }
                                    ]
                                );
                            } else {
                                Alert.alert(res.header, res.body);
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryKeyColor,
    },
    scrollView: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        marginTop: '5%',
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
        backgroundColor: Colors.secondaryKeyColor
    },
    nameSurnameContainer: {
        flexDirection: 'row', 
        marginTop: '10%',
        marginBottom: '2%'
    }
});

export { CreateAccountScreen };
