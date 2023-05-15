import React, { useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Alert,
    Dimensions
} from 'react-native';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';
import { CustomTextInput } from '../components/CustomTextInput';
import { TermsAndConditions } from '../components/TermsAndConditions'; 
import { CustomButton } from '../components/CustomButton';
import { validateEmail, validatePassword, validateTextField } from '../utils/Validator';
import { ResponsiveDimensions } from '../utils/ResponsiveDimensions';
import { StackActions } from '@react-navigation/native';

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
                {/* <View>
                    <Text style={[Fonts.displaySmall, {color: Colors.onSecondaryKeyColor}]}>Criar Conta</Text>
                </View> */}
                <View style={{flexDirection: 'row', marginTop: '10%', marginBottom: '3%'}}>
                    <CustomTextInput
                        placeholder={'Nome'}
                        state={name}
                        setState={setName}
                    />
                    <CustomTextInput
                        placeholder={'Apelido'}
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
                    marginBottomPercentage={3}
                />
                <CustomTextInput
                    placeholder={'Palavra-passe'}
                    widthPercentage={90}
                    state={password}
                    setState={setPassword}
                    hide={true}
                    marginBottomPercentage={3}
                />
                <CustomTextInput
                    placeholder={'Confirmar palavra-passe'}
                    widthPercentage={90}
                    state={confirmPassword}
                    setState={setConfirmPassword}
                    hide={true}
                    marginBottomPercentage={5}
                />
                <TermsAndConditions
                    setState={setChecked}
                />
                <View style={{marginTop: '10%'}}>
                    <CustomButton
                        text={'Criar'}
                        onPress={() => {
                            let res = validateData(name, surname, username, email, password, confirmPassword);
                            Alert.alert(res.header, res.body);
                            if (res.header == 'Conta criada com sucesso!') {
                                // Save account data to database.
                                // Log user in.
                                navigation.dispatch(StackActions.replace('HomeNavigator'));
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
    }
});

export { CreateAccountScreen };
