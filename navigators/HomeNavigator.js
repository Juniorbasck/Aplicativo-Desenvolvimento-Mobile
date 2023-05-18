import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { EditExpenseScreen } from '../screens/EditExpenseScreen';

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
                name={'EditExpense'} 
                component={EditExpenseScreen} 
                options={{headerShown: true, headerTitle: 'Editar Dispesa', headerTitleAlign: 'center'}}
            />
        </Stack.Navigator>
    );
}

export { HomeNavigator };
