import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import IssuerDetailsScreen from './screens/IssuerDetailsScreen';
import IssuersScreen from '../IssuersScreen';

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
                name='IssuerDetails' 
                component={IssuerDetailsScreen}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};

export default IssuersNavigator;
