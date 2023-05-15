import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { ExpenseEditScreen } from '../screens/ExpenseEditScreen';

const Stack = createStackNavigator();

const HomeNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={'Home'}
        >
            <Stack.Screen 
                name={'Home'} 
                component={HomeScreen} 
                options={{headerShown: true}}
            />
            <Stack.Screen 
                name={'ExpenseEdit'} 
                component={ExpenseEditScreen} 
                options={{headerShown: true, headerTitle: 'Editar Dispesa', headerTitleAlign: 'center'}}
            />
        </Stack.Navigator>
    );
}

export { HomeNavigator };
