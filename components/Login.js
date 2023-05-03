import React from "react";
import { StyleSheet, Text, View, TextInput, Image, Button } from "react-native";

export default function Login({handleLogin, handleGoogleLogin}) {

    return<>

        <View style={estilos.container}>

            <View>
            <Text style={estilos.areaTitulo}>Meu controlo</Text> 
            <Text style={estilos.areaTitulo2}>Financeiro</Text>
            <Text style={estilos.areaTitulo3}>$</Text>
            </View> 

            <View>
                <TextInput
                style={estilos.input}
                placeholder="E-Email ou usuário"
                />
            </View>

            <View>
                <TextInput
                style={estilos.input}
                placeholder="Palavra-passe"
                />
            </View>

            <View style={estilos.passaword}>
                <Text>Esquece plavra-passe?</Text>
            </View>


            <View>
                <Button title="Entrar" onPress={handleLogin} />
            </View>
            <View>
                <Button title="Acessar com a conta Google" onPress={handleGoogleLogin} />
            </View>
        </View>
    </>
}

 
const estilos = StyleSheet.create({

    container: {
    flexDirection: "column",
    backgroundColor: "#D3D3D3",
    alignItems: 'center',
    justifyContent: 'center',
   
    },

    areaTitulo: {
        // backgroundColor: "#486D31",
        fontSize: 30,
        width: 200,
        marginTop: 100,
    }, 
    areaTitulo2: {
        
        // backgroundColor: "#486D31",
        fontSize: 30,
        width: 200,
    }, 

    areaTitulo3: {

        //backgroundColor: "#486D31",
        fontSize: 30,
        marginBottom: 60 ,
        
    }, 


    ///froms 

    input: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width: 300,
        borderRadius: 5,  
    },

    passaword: {
        alignSelf: "flex-end",
        marginRight: 20,
        marginTop: 10,
    },
});