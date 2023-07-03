import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CitiesScreen from './screens/CitiesScreen';
import CreateCityScreen from './screens/CreateCityScreen';

const Stack = createStackNavigator();

const CitiesNavigator = () => (
    <Stack.Navigator
        initialRouteName='Cities'
        screenOptions={{headerShown: false}}
    >
        <Stack.Screen component={CitiesScreen} name='Cities'/>
        <Stack.Screen 
            component={CreateCityScreen} 
            name='CreateCity'
            options={
                {
                    headerShown: true, 
                    headerTitle: 'Criar Nova Cidade', 
                    headerTitleAlign: 'center'
                }
            }
        />
    </Stack.Navigator>
);

export default CitiesNavigator;
