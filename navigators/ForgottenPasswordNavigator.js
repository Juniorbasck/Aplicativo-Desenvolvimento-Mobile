import { createStackNavigator } from '@react-navigation/stack';
import { ForgottenPasswordScreen } from '../screens/ForgottenPasswordScreen';
import { ValidationCodeScreen } from '../screens/ValidationCodeScreen';
import { RedefinePasswordScreen } from '../screens/RedefinePasswordScreen';

const Stack = createStackNavigator();

const ForgottenPasswordNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName='ForgottenPassword'
            screenOptions={{headerShown: true}}
        >
            <Stack.Screen 
                name='ForgottenPassword' 
                component={ForgottenPasswordScreen}
                options={{headerTitle: 'Esqueceu Palavra-Passe', headerTitleAlign: 'center'}}
            />
            <Stack.Screen 
                name='ValidationCode' 
                component={ValidationCodeScreen} 
                initialParams={{doLogin: false}}
                options={{headerTitle: 'Validação de Código', headerTitleAlign: 'center'}}
            />
            <Stack.Screen 
                name='RedefinePassword'
                component={RedefinePasswordScreen}
                options={{headerTitle: 'Redefinir Palavra-Passe', headerTitleAlign: 'center'}}
            />
        </Stack.Navigator>
    );
};

export { ForgottenPasswordNavigator };
