import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { ForgottenPasswordScreen } from '../screens/ForgottenPasswordScreen';
import { AppNavigator } from './AppNavigator';
import { CreateAccountNavigator } from './CreateAccountNavigator';
import { ForgottenPasswordNavigator } from './ForgottenPasswordNavigator';

const Stack = createStackNavigator();

const LoginNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'Login'}
            >
                <Stack.Screen 
                    name={'Login'} 
                    component={LoginScreen} 
                    options={
                        {
                            headerShown: true,
                            headerTitle: 'Seja Bem-Vindo', 
                            headerTitleAlign: 'center', 
                            headerTitleStyle: {
                                fontFamily: 'serif', 
                                fontWeight: 'bold'
                            }
                        }
                    }
                />
                <Stack.Screen 
                    name={'CreateAccountNavigator'} 
                    component={CreateAccountNavigator} 
                    options={{headerShown: false}}
                />
                <Stack.Screen 
                    name={'ForgottenPasswordNavigator'} 
                    component={ForgottenPasswordNavigator}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name={'AppNavigator'}
                    component={AppNavigator}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export { LoginNavigator };
