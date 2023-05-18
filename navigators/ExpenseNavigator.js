import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ExpenseScreen } from '../screens/ExpenseScreen';
import { ExpenseEditScreen } from '../screens/ExpenseEditScreen';

const Stack = createStackNavigator();

const ExpenseNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={'Expense'}
        >
            <Stack.Screen 
                name={'Expense'} 
                component={ExpenseScreen} 
                options={{headerShown: true, headerTitle: 'Despesas'}}
            />
            <Stack.Screen 
                name={'ExpenseEdit'} 
                component={ExpenseEditScreen} 
                options={{headerShown: true, headerTitle: 'Editar Dispesa', headerTitleAlign: 'center'}}
            />
        </Stack.Navigator>
    );
}

export { ExpenseNavigator };
