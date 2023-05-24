import { useState } from 'react';
import {
    Alert,
    View,
    ScrollView,
    StyleSheet,
    Text,
    Dimensions
} from 'react-native';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';
import { PasswordInput } from '../components/PasswordInput';
import { CustomButton } from '../components/CustomButton';
import { validatePassword } from '../utils/Validator';

const checkPassword = password => {
    // Check password on API.
    if (password.length > 0) {
        return true;
    }
    return false;
}

const ChangePasswordScreen = ({navigation}) => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');

    const [showChangePassword, setShowChangePassword] = useState(false);
    const [chances, setChances] = useState(3);
    const [editable, setEditable] = useState(true);

    return (
        <View style={styles.container}>
            <ScrollView
                keyboardDismissMode='on-drag'
                contentContainerStyle={styles.scrollView}
            >
                <View style={styles.innerContainer}>
                    <Text style={[styles.typePassword, Fonts.bodyLarge, { marginTop: '15%'}]}>Digite a palavra-passe atual</Text>
                    <PasswordInput
                        state={password}
                        setState={setPassword}
                        marginTopPercentage={2}
                        marginBottomPercentage={2}
                        editable={editable}
                    />
                    <CustomButton
                        text={'Verificar'}
                        backgroundColor={editable ? Colors.tertiaryKeyColor : Colors.tertiaryKeyColorDisabled}
                        textColor={'white'}
                        onPress={() => {
                            if (checkPassword(password)) {
                                setShowChangePassword(true);
                                setEditable(false);
                            } else {
                                if (!(chances - 1)) {
                                    Alert.alert('Palavra-passe Inválida', 'Muitas tentativas foram feitas. Tente novamente mais tarde!');
                                    setEditable(false);
                                } else {
                                    setChances(chances - 1);
                                    Alert.alert('Palavra-passe Inválida', `Você tem ${chances - 1} chance(s) restante(s)!`);
                                }
                            }
                        }}
                        widthPercentage={50}
                        disabled={!editable}
                    />
                    {
                        showChangePassword && (
                            <>
                                <Text style={[styles.typePassword, Fonts.bodyLarge, {marginTop: '15%'}]}>Digite a nova palavra-passe</Text>
                                <PasswordInput
                                    state={newPassword}
                                    setState={setNewPassword}
                                    marginTopPercentage={2}
                                    marginBottomPercentage={2}
                                    placeholder='Nova palavra-passe'
                                />
                                <Text style={[styles.typePassword, Fonts.bodyLarge]}>Repita a nova palavra-passe</Text>
                                <PasswordInput
                                    state={repeatPassword}
                                    setState={setRepeatPassword}
                                    marginTopPercentage={2}
                                    marginBottomPercentage={2}
                                    placeholder='Repita nova palavra-passe'
                                />
                                <CustomButton
                                    text={'Guardar'}
                                    backgroundColor={Colors.tertiaryKeyColor}
                                    textColor={'white'}
                                    onPress={() => {
                                        if (validatePassword(newPassword)) {
                                            if (newPassword == repeatPassword) {
                                                Alert.alert(
                                                    'Mudança de Palavra-Passe', 
                                                    'Sua palavra-passe foi atualizada com sucesso!'
                                                    [
                                                        {
                                                            text: 'Ok',
                                                            onPress: () => navigation.goBack()
                                                        }
                                                    ]
                                                );
                                            } else {
                                                Alert.alert('Mudança de Palavra-Passe', 'Ambas as senhas devem ser iguais!');
                                            }
                                        } else {
                                            Alert.alert('Mudança de Palavra-Passe', 'A palavra-passe deve ter no mínimo 6 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 caracter especial!');
                                        }
                                    }}
                                    widthPercentage={50}
                                />
                            </>
                        )
                    }
                </View>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryKeyColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    innerContainer: {
        alignSelf: 'flex-start', 
        marginLeft: '3.5%'
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
    typePassword: {
        alignSelf: 'flex-start',
        marginHorizontal: '5%',
    }
});

export { ChangePasswordScreen };
