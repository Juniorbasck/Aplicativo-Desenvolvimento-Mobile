import React from 'react';
import {
    Text,
    StyleSheet
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UsersNavigator from './screens/usersNavigator/UsersNavigator';
import CitiesNavigator from './screens/citiesNavigator/CitiesNavigator';
import IssuersNavigator from './screens/issuersNavigator/IssuersNavigator';
import PaymentMethodsScreen from './screens/PaymentMethodsScreen';
import { Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

const AdminNavigator = ({navigation}) => {
    const {
        drawerLabelStyle
    } = styles;

    const drawLabel = text => ({focused, color}) => <Text style={drawerLabelStyle}>{text}</Text>;

    return (
        <Drawer.Navigator initialRouteName='Users'>
            <Drawer.Screen 
                name='UsersNavigator' 
                options={
                    {
                        drawerActiveTintColor: '#4287f5',
                        drawerInactiveTintColor: 'black',
                        drawerLabel: drawLabel('Usuários'), 
                        headerShown: true,
                        headerTitle: 'Usuários',
                        headerTitleAlign: 'center',
                        drawerIcon: ({color, focused, size}) => {
                            let theColor = focused ? '#4287f5' : 'black';
                            return (
                                <Feather name='users' color={theColor} size={25}/>
                            );
                        }
                    }
                }
            >
                {() => <UsersNavigator navigation={navigation}/>}
            </Drawer.Screen>
            <Drawer.Screen 
                component={CitiesNavigator} 
                name='CitiesNavigator' 
                options={
                    {
                        drawerActiveTintColor: '#4287f5',
                        drawerInactiveTintColor: 'black',
                        drawerLabel: drawLabel('Cidades'), 
                        headerTitle: 'Cidades',
                        headerTitleAlign: 'center',
                        drawerIcon: ({color, focused, size}) => {
                            let theColor = focused ? '#4287f5' : 'black';
                            return (
                                <FontAwesome5 name='city' size={25} color={theColor} />
                            );
                        }
                    }
                }
            />
            <Drawer.Screen 
                component={IssuersNavigator} 
                name='IssuersNavigator' 
                options={
                    {
                        drawerActiveTintColor: '#4287f5',
                        drawerInactiveTintColor: 'black',
                        drawerLabel: drawLabel('Emissores'), 
                        headerTitle: 'Emissores',
                        headerTitleAlign: 'center',
                        drawerIcon: ({color, focused, size}) => {
                            let theColor = focused ? '#4287f5' : 'black';
                            return (
                                <FontAwesome5 name='receipt' size={25} color={theColor} />
                            );
                        }
                    }
                }
            />
            <Drawer.Screen 
                component={PaymentMethodsScreen} 
                name='PaymentMethods' 
                options={
                    {

                        drawerActiveTintColor: '#4287f5',
                        drawerInactiveTintColor: 'black',
                        drawerLabel: drawLabel('Pagamentos'),
                        headerTitle: 'Métodos de Pagamento',
                        headerTitleAlign: 'center',
                        drawerIcon: ({color, focused, size}) => {
                            let theColor = focused ? '#4287f5' : 'black';
                            return (
                                <MaterialIcons name='payment' size={25} color={theColor} />
                            );
                        }
                    }
                }
            />
        </Drawer.Navigator>
    );
};

const styles = StyleSheet.create({
    drawerLabelStyle: {
        textAlign: 'center', 
        fontWeight: 'bold'
    }
});

export default AdminNavigator;
