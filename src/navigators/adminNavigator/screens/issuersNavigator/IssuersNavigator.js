import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IssuersScreen from './screens/IssuersScreen';
import CreateIssuerScreen from './screens/CreateIssuerScreen';

const Stack = createStackNavigator();

const IssuersNavigator = _ => {
    return (
        <Stack.Navigator initialRouteName='Issuers'>
            <Stack.Screen 
                name='Issuers' 
                component={IssuersScreen} 
                options={{headerShown: false}}
            />
            <Stack.Screen 
                name='CreateIssuer' 
                component={CreateIssuerScreen}
                options={{headerTitle: 'Criar Emissor', headerTitleAlign: 'center'}}
            />
        </Stack.Navigator>
    );
};

export default IssuersNavigator;
