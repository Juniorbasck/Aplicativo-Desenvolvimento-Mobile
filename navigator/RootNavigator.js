import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { CreateAccountScreen } from '../screens/CreateAccountScreen';
import { ForgottenPasswordScreen } from '../screens/ForgottenPasswordScreen';
import { Colors } from '../utils/Colors';

const Stack = createStackNavigator();

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={'LoginScreen'}
                screenOptions={{headerTitle: ''}}
            >
                <Stack.Screen name={'LoginScreen'} component={LoginScreen} options={{headerShown: false}}/>
                <Stack.Screen 
                    name={'CreateAccount'} 
                    component={CreateAccountScreen} 
                    options={
                        {
                            headerStyle: { backgroundColor: Colors.primaryKeyColor }, 
                            headerTintColor: Colors.onPrimaryKeyColor
                        }
                    }
                />
                <Stack.Screen 
                    name={'ForgottenPassword'} 
                    component={ForgottenPasswordScreen}
                    options={
                        {
                            headerStyle: { backgroundColor: Colors.primaryKeyColor },
                            headerTintColor: Colors.onPrimaryKeyColor
                        }
                    }
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export { RootNavigator };
