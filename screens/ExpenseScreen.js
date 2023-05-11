import React, { useState, useEffect } from 'react';
import {
    FlatList,
    View,
    ScrollView,
    Text,
    StyleSheet,
    Alert,
    Dimensions
} from 'react-native';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';
import { ResponsiveDimensions } from '../utils/ResponsiveDimensions';
import { ProfilePicture } from '../components/picture/ProfilePicture';
import { ExpenseStatus } from '../components/expense_status/ExpenseStatus';
import { ExpenseCard } from '../components/expense_card/ExpenseCard';
import { getExpenses } from '../service';

const ExpenseScreen = ({route, navigation}) => {
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        getExpenses(setExpenses);
    }, []);

    let username = 'Marinna';
    let toPay = expenses.filter((expense) => !expense.paid);
    let total = toPay.reduce((accumulator, expense) => accumulator + expense.price, 0.0).toFixed(2);
    let expenseTitle = 'Despesas Atuais';
    if (!toPay.length) {
        expenseTitle = 'Sem ' + expenseTitle;
    }
    return (
        <View style={styles.outerContainer}>
            <View>
                <Text style={[Fonts.displaySmall, styles.greetingText, {color: Colors.onPrimaryKeyColor}]}>{expenseTitle}</Text> 
            </View>
            <View 
                style={
                    [
                        styles.expenseBoard,
                        toPay.length > 1 ? {flex: 4} : toPay.length > 0 ? {flex: 2} : {flex: 1}
                    ]
                }
            >
                <View style={styles.currentExpensesTitleContainer}>
                           
                </View>
                <FlatList
                    data={toPay}
                    renderItem={(item) => <ExpenseCard data={{...item}}/>}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 6,
        flexDirection: 'column',
        backgroundColor: Colors.primaryKeyColor,
        marginTop: ResponsiveDimensions.screen.defaultMarginTop,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    upperContainer: {
        flex: 1,
        flexDirection: 'row',
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
        fontWeight: 'bold', 
        color: Colors.onPrimaryKeyColor
    },
    expenseStatus: {
        flex: 4,
        marginBottom: 20
    },
    expenseBoard: {
        borderTopRightRadius: 60,
        borderTopLeftRadius: 60,
        paddingHorizontal: 5,
        backgroundColor: Colors.secondaryKeyColor,
        width: ResponsiveDimensions.screen.width
    },
    currentExpensesTitleContainer: {
        margin: 20
    },
    currentExpensesTitle: {
        fontWeight: 'bold', 
        textAlign: 'center'
    }
});

export { ExpenseScreen };
