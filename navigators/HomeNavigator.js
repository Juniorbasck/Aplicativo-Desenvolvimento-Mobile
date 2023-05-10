import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ExpenseScreen } from '../screens/ExpenseScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../utils/Colors';

const Tab = createBottomTabNavigator();

const HomeNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName={'Home'}
            screenOptions={({ route }) =>({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name == 'Home') {
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
            <Tab.Screen name={'Home'} component={HomeScreen}/>
            <Tab.Screen name={'Profile'} component={ProfileScreen}/>
            <Tab.Screen name={'Expense'} component={ExpenseScreen}/>
        </Tab.Navigator>
    );
};

export { HomeNavigator };
