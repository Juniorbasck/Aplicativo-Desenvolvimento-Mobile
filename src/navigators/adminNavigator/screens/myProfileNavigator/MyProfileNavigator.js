import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyProfileScreen from './screens/MyProfileScreen';

const Stack = createStackNavigator();

const MyProfileNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='MyProfile'>
            <Stack.Screen 
                name='MyProfile' 
                component={MyProfileScreen} 
                options={
                    { 
                        headerShown: false
                    }
                }
            />
        </Stack.Navigator>
    );
};

export default MyProfileNavigator;
