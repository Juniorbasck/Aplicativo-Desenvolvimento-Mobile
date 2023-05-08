import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { CreateAccountScreen } from '../screens/CreateAccountScreen';
import { ForgottenPasswordScreen } from '../screens/ForgottenPasswordScreen';
import { Colors } from '../utils/Colors';
import { HomeNavigator } from './HomeNavigator';
import { ResponsiveDimensions } from '../utils/ResponsiveDimensions';

const Stack = createStackNavigator();

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'Login'}
                screenOptions={
                    {
                        headerShown: true,
                        headerTitle: '',
                        headerStatusBarHeight: 20
                    }
                }
            >
                <Stack.Screen 
                    name={'Login'} 
                    component={LoginScreen} 
                    options={
                        {
                            // headerShown: true
                        }
                    }
                />
                <Stack.Screen 
                    name={'CreateAccount'} 
                    component={CreateAccountScreen} 
                    options={
                        {   
                            // headerStyle: { backgroundColor: Colors.primaryKeyColor}, 
                            // headerTintColor: Colors.onPrimaryKeyColor
                        }
                    }
                />
                <Stack.Screen 
                    name={'ForgottenPassword'} 
                    component={ForgottenPasswordScreen}
                    options={
                        {
                            // headerStyle: { backgroundColor: Colors.primaryKeyColor },
                            // headerTintColor: Colors.onPrimaryKeyColor
                        }
                    }
                />
                <Stack.Screen
                    name={'HomeNavigator'}
                    component={HomeNavigator}
                    options={
                        {
                            headerShown: false
                        }
                    }
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export { RootNavigator };
