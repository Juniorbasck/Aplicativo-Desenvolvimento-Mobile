import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import expenses from './expenses.json';

const USE_MOCK_DATA = true;

const sort = exps => {
    let sorted = exps.sort((exp1, exp2) => new Date(exp1.date).getTime() - new Date(exp2.date).getTime());
    let paid = [], notPaid = [];
    for (let exp of sorted) {
        if (exp.paid) {
            paid.push(exp);
        } else {
            notPaid.push(exp);
        }
    }
    return notPaid.concat(paid);
}

const fetchExpenses = async (onFetchData, email='') => {
    let exps;
    if (USE_MOCK_DATA) {
        exps = expenses;
    } else {
        // Fetch data from database using `email` as primary key.
        // exps = databaseExps(email);
    }
    onFetchData(sort(exps));
};

const fetchUserData = async (email) => {

};

const getExpenses = async (email='') => {
    let exps;
    if (USE_MOCK_DATA) {
        exps = expenses;
    } else {
        // Fetch data from database using `email` as primary key.
        // exps = databaseExps(email);
    }
    return sort(exps);
}

const updateExpense = expense => {
    // Update on API.
}

const createExpense = (title, entity, date, price, paymentMethod, image, paid) => {
    // Create on API.
}

const deleteExpense = id => {
    // Delete the corresponding expense on the API.
}

const tryLogin = (email, password) => {
    // Try to match the password with the corresponding email's saved encrypted password.
    // if match: return user data.
    // else: return null.
    // if (email === 'mari123@gmail.com' && password === '') {
    //     return {
    //         name: 'Marinna',
    //         surname: 'Silva',
    //         username: 'mari123',
    //         email: email,
    //     }
    // }
    // return null;
    return {
        name: 'Marinna',
        surname: 'Silva',
        username: 'mari123',
        email: 'mari123@gmail.com',
        // image: require('./assets/face1.jpg'),
    }
}

const signInGoogle = () => {
    Alert.alert('Entrar com API do Google');
}

const getPaymentMethods = () => {
    // In the final version, this method will fetch this data from the API
    // where the available payment methods will be available.
    return [
        {label: 'Cartão de crédito', value: 1},
        {label: 'Débito direto', value: 2},
        {label: 'Transferência', value: 3},
        {label: 'MBWay', value: 4},
        {label: 'Cheque', value: 5},
        {label: 'Monetário', value: 6},
    ];
};

const updateUser = userData => {
    // Update user data on API.
};

const fetchHistoric = (email, onFetch) => {
    let historic = [
        {
            timestamp: '2022-10-20T16:30:00',
            date: '2023-01-02',
            expenseTitle: 'Compras de aniversario no Lidl',
            entity: 'Lidl',
            paymentMethod: 5,
            price: 500,
            paid: false,
            operation: 1
        },
        {
            timestamp: '2023-01-03T07:44:30',
            date: '2023-01-02',
            expenseTitle: 'Compras de aniversario no Lidl',
            entity: 'Lidl',
            paymentMethod: 3,
            price: 340,
            paid: true,
            operation: 3
        },
        {
            timestamp: '2023-01-04T07:44:30',
            date: '2023-01-02',
            expenseTitle: 'Compras de aniversario no Lidl',
            entity: 'Lidl',
            paymentMethod: 4,
            price: 340,
            paid: true,
            operation: 2
        },
        {
            timestamp: '2023-01-05T07:44:30',
            date: '2023-01-02',
            expenseTitle: 'Compras de aniversario no Lidl',
            entity: 'Lidl',
            paymentMethod: 2,
            price: 340,
            paid: true,
            operation: 2
        },
        {
            timestamp: '2023-01-06T07:44:30',
            date: '2023-01-02',
            expenseTitle: 'Compras de aniversario no Lidl',
            entity: 'Lidl',
            paymentMethod: 3,
            price: 340,
            paid: true,
            operation: 3
        },
    ];
    onFetch(historic);
};

const stringifyOperation = operation => {
    switch (operation) {
        default:
        case 1: return 'Criação';
        case 2: return 'Alteração';
        case 3: return 'Deleção';
    }
};

const stringifyPaymentMethod = paymentMethod => {
    switch (paymentMethod) {
        default:
        case 1: return 'Cartão de crédito';
        case 2: return 'Débito direto';
        case 3: return 'Transferência';
        case 4: return 'MBWay';
        case 5: return 'Cheque';
        case 6: return 'Monetário';
    }
};

const checkValidationCode = (email, code) => {
    // Validate on API.
    return code == '1234';
};  

const generateValidationCode = email => {
    // Generate validation code on API and bind it to `email`.
    // It should be valid only for an amount of time.
};

const sendCodeEmail = (email) => {

};

const storeDataAsync = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {}
};

const getDataAsync = async (key, onGetData) => {
    try {
        AsyncStorage.getItem(key).then(value => onGetData(JSON.parse(value)));
    } catch (e) {} 
};

export { 
    getExpenses, 
    getPaymentMethods,
    fetchExpenses,
    fetchHistoric,
    updateExpense, 
    createExpense, 
    deleteExpense, 
    tryLogin, 
    signInGoogle,
    updateUser,
    sort,
    stringifyOperation,
    stringifyPaymentMethod,
    checkValidationCode,
    generateValidationCode,
    sendCodeEmail,
    storeDataAsync,
    getDataAsync
};
