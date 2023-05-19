import React from 'react';
import { View, StyleSheet,Text, TextInput, Button} from 'react-native';
import { CustomButton } from '../components/CustomButton';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';
import { CustomTextInput } from '../components/CustomTextInput';
import { validateEmail, validatePassword } from '../utils/Validator';
import { StackActions } from '@react-navigation/native';
import { ResponsiveDimensions } from '../utils/ResponsiveDimensions';
// import { GoogleSignin } from 'react-native-google-signin';

function validateData(email, password){
    let message = {};
    message.header = 'Sucesso';
    // if(validateEmail(email)) {
    //     if (validatePassword(password)) {
    //         // Check database for the given credentials: email and password.
    //         // If all good, log in!
    //         message.header = 'Sucesso';
    //     } else {
    //         message.header = 'Credenciais Inválidas!';
    //         message.body = 'Verifique suas credenciais e tente novamente';
    //     }
    // } else {
    //     message.header = 'E-mail Inválido!';
    //     message.body = 'Endereço de e-mail inválido!';
    // }
    return message;
}

// async function handleGoogleSignIn(){

//     try {
//         await GoogleSignin.configure();
//         const { idToken } = await GoogleSignin.signIn();
//         // Faça alguma coisa com o token, como enviar para o servidor
//       } catch (error) {
//         console.error(error);
//       }
      
// }


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = React.useState('');   
    const [password, setPassword] = React.useState('');

    return (
        <View style={styles.outerContainer}>
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
                                navigation.dispatch(StackActions.replace('AppNavigator'));
                            } else {
                                Alert.alert(res.header, res.body);
                            }
                        }
                    }
                />
            </View>
            <View>
                <CustomButton style={styles.buttosignIn}
                    text={'Acessar com Google'}
                    backgroundColor={'#fff'}
                    textColor={'black'}
                    widthPercentage={88}
                    // onPress={() => handleGoogleSignIn()}
                />
            </View>
            <Text style={styles.createCount} onPress={() => navigation.navigate('CreateAccount')}>
                Ir para criar conta
            </Text> 
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
    createCount: {
        textDecorationLine: 'underline',
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 35,
    },  
});
        
export { LoginScreen };
