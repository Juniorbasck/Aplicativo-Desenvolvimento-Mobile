import React from 'react';
import { 
    View,
    ScrollView,
    StyleSheet,
    Text,
    Alert,
    Dimensions,
    Pressable,
    Image
} from 'react-native';
import { CustomButton } from '../components/CustomButton';
import { CustomTextInput } from '../components/CustomTextInput';
import { StackActions } from '@react-navigation/native';
import { validateEmail, validatePassword } from '../utils/Validator';
import { tryLogin, signInGoogle } from '../service';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';

function validateData(email, password){
    let message = {};
    if(validateEmail(email)) {
        if (validatePassword(password)) {
            message.header = 'Sucesso';
        } else {
            message.header = 'Padrão de Senha';
            message.body = 'A palavra-passe deve ter no mínimo 6 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 caracter especial!';
        }
    } else {
        message.header = 'E-mail Inválido!';
        message.body = 'Endereço de e-mail inválido!';
    }
    return message;
}

const LoginScreen = ({route, navigation}) => {
    const [email, setEmail] = React.useState('');   
    const [password, setPassword] = React.useState('');

    return (
        <View style={styles.outerContainer}>
            <ScrollView
                contentContainerStyle={{width: Dimensions.get('window').width, height: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'flex-start', marginTop: '20%'}}
                keyboardDismissMode='on-drag'
            >
                <View>
                    <Text style={styles.title}>Meu Controlo</Text>
                    <Text style={styles.subtitle}>financeiro</Text>
                </View>
                <Text style={styles.cifrao}>$</Text>
                <CustomTextInput
                    state={email}
                    setState={setEmail}
                    placeholder='E-mail ou usuário'
                    widthPercentage={90}
                />
                <CustomTextInput
                    state={password}
                    setState={setPassword}
                    placeholder='Palavra-passe'
                    widthPercentage={90}
                    hide={true}
                />
                <View style={styles.password}>
                    <Text 
                        style={styles.textpassword} 
                        onPress={() => navigation.navigate('ForgottenPassword')}
                    >Esqueceu palavra-passe?</Text>
                </View>
                <View>
                    <CustomButton style={styles.buttosignIn}
                        text={'Entrar'}
                        backgroundColor={'#486D31'}
                        textColor={'white'}
                        widthPercentage={88}
                        onPress={() => {
                                let res = validateData(email, password);
                                if (res.header == 'Sucesso') {
                                    loginTrialRes = tryLogin(email, password);
                                    if (loginTrialRes) {
                                        navigation.dispatch(StackActions.replace('AppNavigator', {userData: loginTrialRes}));
                                    } else {
                                        Alert.alert('Credenciais Invalidas!', 'Infelizmente, não encontramos uma conta com essas credenciais!');
                                        setEmail('');
                                        setPassword('');
                                    }
                                } else {
                                    Alert.alert(res.header, res.body);
                                    setEmail('');
                                    setPassword('');
                                }
                            }
                        }
                    />
                </View>
                <Pressable
                    style={styles.googleSignInContainer}
                    onPress={signInGoogle}
                >
                    <Image
                        source={require('../assets/google_logo.png')}
                        style={styles.googleLogo}
                        resizeMode='contain'
                    />
                    <Text style={[Fonts.headlineSmall, {flex: 3}]}>Acessar com Google</Text>
                </Pressable>
                <Text style={styles.createAccount} onPress={() => navigation.navigate('CreateAccount')}>
                    Ir para criar conta
                </Text> 
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#222222',
    },
    scrollViewContainer: {
        width: Dimensions.get('window').width, 
        height: Dimensions.get('window').height, 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        marginTop: '20%'
    },
    containerTitulo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 40,
        marginLeft: 35,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    cifrao: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'gold',
    },
    separandoConteudos:{
        marginTop: 80,
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width: 350,
        borderRadius: 2,  
        backgroundColor: '#D3D3D3',
    },
    password: {
        alignSelf: 'flex-end',
        marginRight: 20,
        marginTop: 10,
        marginBottom: 15,
    },
    textpassword:{
        textDecorationLine: 'underline',
        color: '#FFFFFF',
    },
    createAccount: {
        textDecorationLine: 'underline',
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: '30%',
    },
    googleSignInContainer: {
        backgroundColor: 'white',
        width: Dimensions.get('window').width * .88,
        height: Dimensions.get('window').height * .047,
        borderRadius: 20,
        margin: '2.5%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    googleLogo: {
        flex: 1, 
        width: Dimensions.get('window').width * .085, 
        height: Dimensions.get('window').height * .041, 
    }
});
        
export { LoginScreen };
