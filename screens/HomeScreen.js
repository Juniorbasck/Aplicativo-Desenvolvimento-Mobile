import { useState, useEffect } from 'react';
import {
    FlatList,
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';
import { ResponsiveDimensions } from '../utils/ResponsiveDimensions';
import { ProfilePicture } from '../components/ProfilePicture';
import { ExpenseStatus } from '../components/ExpenseStatus';
import { ExpenseCard } from '../components/ExpenseCard';
import { LoadingIndicator } from '../components/LoadingIndicator';
import {
    fetchExpenses,
    fetchUserData
} from '../service';

const HomeScreen = ({route, navigation}) => {
    const [expenses, setExpenses] = useState([]);
    const [userData, setUserData] = useState({});
    const [isLoadingData, setLoadingData] = useState(true);

    useEffect(() => {
        fetchExpenses(setExpenses);
        fetchUserData(setUserData);
        setTimeout(() => {
            setLoadingData(false);
        }, 1000);
    }, []);

    const handleOnPress = item => {
        navigation.navigate('EditExpense', {
            item: item,
            parentRoute: route.name
        });
    }

    const handleLongPress = id => {
        setExpenses(expenses.filter(ele => ele.id != id));
    }

    const getToPay = () => expenses.filter(expense => !expense.paid);

    const getTotal = () => getToPay().reduce((accumulator, expense) => accumulator + expense.price, 0.0).toFixed(2);
    
    const getExpenseTitle = () => getToPay().length > 0 ? 'Despesas Atuais' : 'Sem Despesas Atuais'; 

    return isLoadingData ? (
            <LoadingIndicator/>
        ) : (
        <View style={styles.outerContainer}>
            <View style={styles.upperContainer}>
                <View style={styles.flexStart}>
                    <View>
                        <Text style={[Fonts.displaySmall, styles.greetingText]}>Olá,</Text>
                    </View>
                    <View>
                        <Text style={[Fonts.headlineMedium, {color: Colors.onPrimaryKeyColor}]}>{userData.name}</Text>
                    </View>
                </View>
                <View style={styles.flexEnd}>
                    <ProfilePicture
                        onPress={() => navigation.navigate('ProfileNavigator')}
                        src={userData.image}
                    />
                </View>
            </View>
            <View style={styles.expenseStatus}>
                <ExpenseStatus
                    total={getTotal()}
                    toPay={getToPay().length}
                    paid={expenses.length - getToPay().length}
                />
            </View>
            <View 
                style={
                    [
                        styles.expenseBoard,
                        getToPay().length > 1 ? {flex: 4} : getToPay().length > 0 ? {flex: 2} : {flex: 1}
                    ]
                }
            >
                <View style={styles.currentExpensesTitleContainer}>
                    <Text style={[Fonts.headlineMedium, styles.currentExpensesTitle]}>{getExpenseTitle()}</Text>        
                </View>
                <FlatList
                    data={getToPay()}
                    renderItem={item => <ExpenseCard data={{...item, onPress: handleOnPress, onLongPress: handleLongPress}}/>}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: Colors.primaryKeyColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    upperContainer: {
        flex: 1,
        flexDirection: 'row',
        alignContent: 'center',
        margin: ResponsiveDimensions.homeScreen.upperContainer.margin
    },
    
    flexStart: {
        flex: 1, 
        alignItems: 'flex-start',
        marginLeft: 20,
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
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 60,
        borderTopLeftRadius: 60,
        paddingHorizontal: 5,
        backgroundColor: Colors.secondaryKeyColor,
        width: Dimensions.get('window').width
    },
    currentExpensesTitleContainer: {
        margin: 20
    },
    currentExpensesTitle: {
        fontWeight: 'bold', 
        textAlign: 'center'
    },
    modalView: {
        position: 'absolute',
        left: '5%',
        top: '20%',
        width: '90%',
        height: '60%',
        alignItems: 'center',
        backgroundColor: Colors.onPrimaryKeyColor,
        borderColor: Colors.primaryKeyColor,
        borderWidth: 1,
        borderRadius: 5,
    },
    defaultMarginPadding: {
        marginBottom: '2%'
    },
    priceDateRow: {
        flexDirection: 'row',
        alignContent: 'space-between'
    }
});

export { HomeScreen };
