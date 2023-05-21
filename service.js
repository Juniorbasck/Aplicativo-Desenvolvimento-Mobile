import { Alert } from 'react-native';
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

const getExpenses = async (onFetchData, email='') => {
    let exps;
    if (USE_MOCK_DATA) {
        exps = expenses;
    } else {
        // Fetch data from database using `email` as primary key.
        // exps = databaseExps(email);
    }
    onFetchData(sort(exps));
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
        email: email,
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

export { getExpenses, getPaymentMethods, updateExpense, createExpense, deleteExpense, tryLogin, signInGoogle };
