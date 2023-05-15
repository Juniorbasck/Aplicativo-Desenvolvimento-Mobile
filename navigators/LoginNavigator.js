import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { CreateAccountScreen } from '../screens/CreateAccountScreen';
import { ForgottenPasswordScreen } from '../screens/ForgottenPasswordScreen';
import { AppNavigator } from './AppNavigator';

const Stack = createStackNavigator();

const LoginNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'Login'}
                screenOptions={
                    {
                        headerShown: false,
                        headerTitle: '',
                        headerStatusBarHeight: 20
                    }
                }
            >
                <Stack.Screen 
                    name={'Login'} 
                    component={LoginScreen} 
                    options={{headerShown: true}}
                />
                <Stack.Screen 
                    name={'CreateAccount'} 
                    component={CreateAccountScreen} 
                    options={{headerShown: true, headerTitle: 'Criar Conta', headerTitleAlign: 'center'}}
                />
                <Stack.Screen 
                    name={'ForgottenPassword'} 
                    component={ForgottenPasswordScreen}
                    options={{headerShown: true}}
                />
                <Stack.Screen
                    name={'AppNavigator'}
                    component={AppNavigator}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export { LoginNavigator };
