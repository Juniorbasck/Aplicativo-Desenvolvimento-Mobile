import React from 'react';
import { View, StyleSheet,Text, TextInput, Button} from 'react-native';
import { CustomButton } from '../components/button/CustomButton';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';
import { CustomTextInput } from '../components/input/CustomTextInput';


function validateData(email, passaword){

    if(validateTextField(email) && validateTextField(passaword)){

        message.header = 'Sucesso!';
    }
}

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

            <View>
                <TextInput
                style={[styles.input, styles.separandoConteudos]}
                placeholder="E-email ou usuário"
                setEmail={setEmail}
                placeholderTextColor="black"
                />
            </View>
            
            <View>
                <TextInput
                style={styles.input}
                placeholder="Palavra-passe"
                setPassword={setPassword}
                placeholderTextColor="black"
                />
            </View>

            <View style={styles.passaword}>
                <Text style={styles.Textpassaword}>Esquece plavra-passe?</Text>
            </View>

            <View>
                <CustomButton style={styles.buttosignIn}
                    text={'Entrar'}
                    backgroundColor={'#486D31'}
                    textColor={'white'}
                    widthPercentage={88}
                    padding={1}
                    onPress={() => {
                        let res = validateData(email, password);
                        Alert.alert(res.header, res.body);
                        if (res.header == 'Conta criada com sucesso!') {
                            // Save account data to database.
                            // Log user in.
                        }
                    }}
                />
            </View>
            <View>
                <CustomButton style={styles.buttosignIn}
                    text={'Acessar com Google'}
                    backgroundColor={'#fff'}
                    textColor={'black'}
                    widthPercentage={88}
                    
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
                backgroundColor: "#222222",
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
                color: '#FFFFFF',
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
                backgroundColor: "#D3D3D3",

            },
            passaword: {
                alignSelf: "flex-end",
                marginRight: 20,
                marginTop: 10,
                marginBottom: 15,
            },

            Textpassaword:{
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

