import React, { useState, useEffect } from 'react';
import {
    FlatList,
    View,
    ScrollView,
    Text,
    StyleSheet,
    Pressable,
    Dimensions,
    TextInput
} from 'react-native';
import { Colors } from '../utils/Colors';
import { Fonts } from '../utils/Fonts';
import { ExpenseCard } from '../components/ExpenseCard';
import { getExpenses } from '../service';
import Ionicons from '@expo/vector-icons/Ionicons';

const ExpenseScreen = ({route, navigation}) => {
    const [expenses, setExpenses] = useState([]);
    const [filteredExpenses, setFilteredExpenses] = useState([]);
    const [orderedExpenses, setOrderedExpenses] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [icon, setIcon] = useState('reorder-three');

    const handleOnPress = item => {
        navigation.navigate('ExpenseEdit', {
            item: item
        });
    };

    useEffect(() => {
        getExpenses(setExpenses);
        getExpenses(setFilteredExpenses);
        getExpenses(setOrderedExpenses);
    }, []);
    
    let expenseTitle = 'Todas as Despesas';
    if (!expenses.length) {
        expenseTitle = 'Sem Despesas';
    }
    return (
        <View style={styles.outerContainer}>
            <View style={styles.titleContainer}>
                <Text style={[Fonts.displaySmall, styles.greetingText]}>{expenseTitle}</Text> 
            </View>
            {
                expenses.length == 0 && (
                    <Pressable
                        style={{marginVertical: '5%'}}
                        onPress={() => {}}
                    >
                        <Text style={styles.addNewExpenseText}>Adicione uma nova despesa</Text>
                    </Pressable>
                )
            }
            <View 
                style={
                    [
                        styles.expenseBoard,
                        expenses.length == 0 ? {opacity: 0} : {flex: 5}
                    ]
                }
            >
                <View 
                    style={styles.searchBar}
                >
                    <Pressable
                        onPress={() => setSearchText('')}
                    >
                        <Ionicons name='search' size={20} color={'grey'}/>
                    </Pressable>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Pesquisar'
                        defaultValue={searchText}
                        onChangeText={text => {
                            setSearchText(text);
                            if (!text.length) {
                                setFilteredExpenses(orderedExpenses);
                            } else {
                                setFilteredExpenses(
                                    orderedExpenses.filter(ele => ele.title.toLowerCase().includes(text.toLowerCase()))
                                );
                            }
                        }}
                    />
                    <Pressable
                        onPress={() => {
                                if (icon == 'reorder-three') {
                                    setIcon('cash');
                                    setOrderedExpenses(expenses.filter(ele => !ele.paid));
                                } else if (icon == 'cash') {
                                    setIcon('checkmark-done');
                                    setOrderedExpenses(expenses.filter(ele => ele.paid));
                                } else {
                                    setIcon('reorder-three');
                                    setOrderedExpenses(expenses);
                                }
                            }
                        }
                    >
                        <Ionicons name={icon} size={25} color={'grey'}/>
                    </Pressable>
                </View>
                <FlatList
                    data={filteredExpenses}
                    renderItem={item => <ExpenseCard data={{...item, onPress: handleOnPress}}/>}
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
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        marginVertical: '5%'
    },
    addNewExpenseText: {
        color: Colors.onPrimaryKeyColor,
        textDecorationLine: 'underline'
    },
    greetingText: {
        fontWeight: 'bold', 
        color: Colors.onPrimaryKeyColor
    },
    expenseBoard: {
        borderTopRightRadius: 60,
        borderTopLeftRadius: 60,
        paddingHorizontal: '2%',
        backgroundColor: Colors.secondaryKeyColor,
        width: Dimensions.get('window').width
    },
    searchBar: {
        marginVertical: '5%',
        flexDirection: 'row',
        backgroundColor: Colors.onPrimaryKeyColor,
        borderColor: Colors.onSecondaryKeyColor,
        borderWidth: 1,
        borderRadius: 20,
        padding: '2%',
        marginHorizontal: '8%',
        alignItems: 'center'
    },
    textInput: {
        flex: 1,
        marginLeft: '2%',
    }
});

export { ExpenseScreen };
