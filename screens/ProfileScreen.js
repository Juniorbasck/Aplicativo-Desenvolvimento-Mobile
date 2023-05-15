import React, { useState, useEffect } from 'react';
import {
    FlatList,
    View,
    ScrollView,
    Text,
    StyleSheet,
    Alert,
    Dimensions,
    Button
} from 'react-native';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';
import { ResponsiveDimensions } from '../utils/ResponsiveDimensions';
import { ProfilePicture } from '../components/ProfilePicture';
import { ExpenseStatus } from '../components/ExpenseStatus';
import { ExpenseCard } from '../components/ExpenseCard';
import { getExpenses } from '../service';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CustomButton } from '../components/CustomButton';
import { StackActions } from '@react-navigation/native';

const ProfileScreen = ({route, navigation}) => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        getExpenses(setExpenses);
    }, []);

    let username = 'Marinna';
    let Title = 'Perfil';
    return (
        <View style={styles.outerContainer}>
            <View style={styles.upperContainer}>
                <View style={styles.flexEnd}>
                    <ProfilePicture
                    />
                </View>
                <View style={styles.flexStart}>
                    <View>
                        <Text style={[Fonts.displaySmall, styles.greetingText, {color: Colors.onPrimaryKeyColor}]}>{username}</Text>
                    </View>
                </View>
                
            </View>
            <View>
                
            </View>
            
            <View 
                style={
                    [
                        styles.expenseBoard
                    ]
                }
            >
                <View style={styles.currentExpensesTitleContainer}>
                    <Text style={[Fonts.headlineMedium, styles.currentExpensesTitle]}>{Title}</Text>

                    <View style="flexDirection: row, alignItems: 'center',">
                        <Ionicons name="settings-outline" size={24} color={Colors.onSecondaryKeyColor}/>
                        <Text style={[Fonts.headlineSmall, styles.textOpcoes]}>Detalhes da Conta</Text> 

                         <CustomButton style={styles.buttonLogout}
                            text={'Terminar Sessão'}
                            backgroundColor={'red'}
                            textColor={'white'}
                            widthPercentage={60}
                            onPress={() => navigation.dispatch(StackActions.replace('Login'))}
                            size={'big'}
                        />
                    </View>    
                </View>
            </View> 
        </View> 
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: Colors.primaryKeyColor,
        marginTop: ResponsiveDimensions.screen.defaultMarginTop,
        alignItems: 'center',
        justifyContent: 'center'
    },

    profilePic: {
        flex: 2,
    },
    upperContainer: {
        flex: 1,
        flexDirection: 'column',
        alignContent: 'center',
        margin: ResponsiveDimensions.homeScreen.upperContainer.margin
    },
    flexStart: {
        flex: 1, 
        alignItems: 'flex-start'
    },
    flexEnd: {
        flex: 1, 
        alignItems: 'flex-end'
    },
    greetingText: {
        marginTop: 10,
        fontWeight: 'bold', 
        color: Colors.onPrimaryKeyColor
    },
    expenseStatus: {
        flex: 4,
        marginBottom: 20
    },
    expenseBoard: {
        flex: 2,
        borderTopRightRadius: 60,
        borderTopLeftRadius: 60,
        paddingHorizontal: 5,
        backgroundColor: Colors.secondaryKeyColor,
        width: ResponsiveDimensions.screen.width
    },
    currentExpensesTitleContainer: {
        margin: 20,
        
    },
    currentExpensesTitle: {
        fontWeight: 'bold', 
        textAlign: 'center'
    },
    textOpcoes: {
        marginTop: 30,
        textAlign: 'center'
    },
});

export { ProfileScreen };
