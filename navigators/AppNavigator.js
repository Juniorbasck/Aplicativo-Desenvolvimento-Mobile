import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProfileScreen } from '../screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../utils/Colors';
import { HomeNavigator } from './HomeNavigator';
import { ExpenseNavigator } from './ExpenseNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName={'HomeNavigator'}
            screenOptions={({ route }) =>({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name == 'HomeNavigator') {
                        iconName = focused ? 'pie-chart' : 'pie-chart-outline';
                    } else if (route.name == 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else {
                        iconName = focused ? 'folder' : 'folder-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={Colors.onSecondaryKeyColor}/>;
                },
                tabBarActiveBackgroundColor: Colors.secondaryKeyColor,
                tabBarInactiveBackgroundColor: Colors.secondaryKeyColor,
                headerShown: true,
                tabBarShowLabel: true,
            })}
        >
            <Tab.Screen 
                name={'HomeNavigator'} 
                component={HomeNavigator}
                options={{headerShown: false, tabBarLabel: 'Home'}}
            />
            <Tab.Screen 
                name={'Profile'} 
                component={ProfileScreen}
                options={{headerShown: false, tabBarLabel: 'Perfil'}}    
            />
            <Tab.Screen 
                name={'ExpenseNavigator'} 
                component={ExpenseNavigator}
                options={{headerShown: false, tabBarLabel: 'Despesas'}}
            />
        </Tab.Navigator>
    );
};

export { AppNavigator };
