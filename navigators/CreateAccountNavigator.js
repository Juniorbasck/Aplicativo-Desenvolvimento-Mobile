import { createStackNavigator } from "@react-navigation/stack";
import { CreateAccountScreen } from "../screens/CreateAccountScreen";
import { ValidationCodeScreen } from "../screens/ValidationCodeScreen";

const Stack = createStackNavigator();

const CreateAccountNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName='CreateAccount'
        >
            <Stack.Screen 
                name='CreateAccount' 
                component={CreateAccountScreen}
                options={{headerShown: true, headerTitle: 'Criar Conta', headerTitleAlign: 'center'}}
            />
            <Stack.Screen 
                name='ValidationCode' 
                component={ValidationCodeScreen} 
                initialParams={{doLogin: true}}
                options={{headerShown: true, headerTitle: 'Validação de Código', headerTitleAlign: 'center'}}
            />
        </Stack.Navigator>
    );
};

export { CreateAccountNavigator };
