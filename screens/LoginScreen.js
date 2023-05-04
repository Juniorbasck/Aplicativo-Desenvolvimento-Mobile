import React from 'react';
import { View, StyleSheet,Text, TextInput, Button} from 'react-native';
import { CustomButton } from '../components/button/CustomButton';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';
import { CustomTextInput } from '../components/input/CustomTextInput';


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
                style={styles.input}
                placeholder="E-email ou usuário"
                />
            </View>
            
            <View>
                <TextInput
                style={styles.input}
                placeholder="Palavra-passe"
                />
            </View>

            <View style={styles.passaword}>
                <Text>Esquece plavra-passe?</Text>
            </View>

            <View>
                <CustomButton style={styles.buttosignIn}
                    text={'Entrar'}
                    backgroundColor={'#486D31'}
                    textColor={'white'}
                    widthPercentage={88}
                    padding={1}
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
            },

           
        });
        
export { LoginScreen };

