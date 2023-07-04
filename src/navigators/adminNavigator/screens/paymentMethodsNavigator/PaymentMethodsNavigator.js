import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PaymentMethodsScreen from './screens/PaymentMethodsScreen';
import CreatePaymentMethodScreen from './screens/CreatePaymentMethodScreen';

const Stack = createStackNavigator();

const PaymentMethodsNavigator = () => 
    <Stack.Navigator
        initialRouteName='PaymentMethods'
    >
        <Stack.Screen 
            component={PaymentMethodsScreen} 
            name='PaymentMethods'
            options={{headerShown: false}}
        />
        <Stack.Screen 
            component={CreatePaymentMethodScreen}
            name='CreatePaymentMethod'
            options={{headerTitle: 'Criar Método de Pagamento', headerTitleAlign: 'center'}}
        />
    </Stack.Navigator>
;

export default PaymentMethodsNavigator;
