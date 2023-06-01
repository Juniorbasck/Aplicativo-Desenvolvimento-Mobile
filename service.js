import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import expenses from './expenses.json';
import { getAuth } from 'firebase/auth';
import { 
    doc,
    collection,
    getDoc, 
    setDoc,
    getDocs,
    updateDoc,
    arrayUnion,
    arrayRemove,
} from 'firebase/firestore';
import { db } from './firebase.config';

const USE_MOCK_DATA = false;

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
};

const sortState = exps => {
    let sorted = exps.value.sort((exp1, exp2) => new Date(exp1.date).getTime() - new Date(exp2.date).getTime());
    let paid = [], notPaid = [];
    for (let exp of sorted) {
        if (exp.paid) {
            paid.push(exp);
        } else {
            notPaid.push(exp);
        }
    }
    return notPaid.concat(paid);
};

const fetchExpensesAsync = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const docRef = doc(db, 'expenses', currentUser.email);
    const theDoc = await getDoc(docRef);
    let temp = theDoc.data();
    return sort(temp.expenses);
};

const fetchExpensesMock = () => {
    return sort(expenses);
}

const fetchExpenses = async onFetchData => {
    let exps;
    if (USE_MOCK_DATA) {
        exps = expenses;
    } else {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        const docRef = doc(db, 'expenses', currentUser.email);
        const theDoc = await getDoc(docRef);
        let temp = theDoc.data();
        exps = temp.expenses;
    }
    onFetchData(sort(exps));
};

const fetchUserData = async onFetchData => {
    let userData;
    if (USE_MOCK_DATA) {
        userData = {
            name: 'Marinna',
            surname: 'Silva',
            username: 'mari123',
            email: 'mari123@gmail.com'
        };
    } else {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        const docRef = doc(db, 'users', currentUser.email);
        const theDoc = await getDoc(docRef);
        userData = theDoc.data();
    }
    onFetchData(userData);
};

const fetchUserDataAsync = async () => {
    let userData;
    if (USE_MOCK_DATA) {
        userData = {
            name: 'Marinna',
            surname: 'Silva',
            username: 'mari123',
            email: 'mari123@gmail.com'
        };
    } else {
        const auth = getAuth();
        const currentUser = auth.currentUser;
        const docRef = doc(db, 'users', currentUser.email);
        const theDoc = await getDoc(docRef);
        userData = theDoc.data();
    }
    return userData;
};

const fetchUserDataMock = () => {
    return {
        name: 'Marinna',
        surname: 'Silva',
        username: 'mari123',
        email: 'mari123@gmail.com'
    };
};

const updateExpense = async (oldExpense, updatedExpense) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const expenseDoc = doc(db, 'expenses', currentUser.email);
    const theDoc = await getDoc(expenseDoc);
    let expenses = theDoc.get('expenses');
    expenses.forEach(e => {
        if (e.title === updateExpense.title) {
            throw new Error('Já existe uma despesa com o mesmo título. Tente novamente mudando o valor deste campo');
        }
    });
    // Remove former expense from database.
    await updateDoc(docRef, {
        expenses: arrayRemove(oldExpense)
    });
    // Add the new one.
    await updateDoc(docRef, {
        expenses: arrayUnion(updatedExpense)
     });
}

const createExpense = async (title, entity, date, price, paymentMethod, image, paid) => {
    let newExpense = {
        title: title,
        entity: entity,
        date: date,
        price: parseFloat(price),
        paymentMethod: paymentMethod,
        image: null,
        paid: paid
    };
    const auth = getAuth();
    const currentUser = auth.currentUser;
    // Check if the new expense is not repeated.
    const expenseDoc = doc(db, 'expenses', currentUser.email);
    const theDoc = await getDoc(expenseDoc);
    let expenses = theDoc.get('expenses');
    expenses.forEach(e => {
        if (e.title === title) {
            throw new Error('Já existe uma despesa com o mesmo título. Tente novamente mudando o valor deste campo');
        }
    });
    await setDoc(expenseDoc, {
        expenses: arrayUnion(newExpense)
    });
}

const deleteExpense = async expense => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const docRef = doc(db, 'expenses', currentUser.email);
    await updateDoc(docRef, {
        expenses: arrayRemove(expense)
    });
};

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

// const updateUser = async newUserData => {
//     const auth = getAuth();
//     const currentUser = auth.currentUser;
//     const docRef = doc(db, 'users', currentUser.email);
//     await updateDoc(docRef, newUserData);
// };

const updateUser = async newUserData => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    // Check if username is not already taken.
    const users = collection(db, 'users');
    const querySnapshot = await getDocs(users);
    querySnapshot.forEach(doc => {
        if (!doc.id != currentUser.email) {
            if (doc.get('username') === newUserData.username) {
                throw new Error(`O nome de utilizador '${newUserData.username}' já está sendo usado`);
            }
        }
    });
    const docRef = doc(db, 'users', currentUser.email);
    await updateDoc(docRef, newUserData);
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
    getPaymentMethods,
    fetchExpenses,
    fetchUserData,
    fetchUserDataAsync,
    fetchUserDataMock,
    fetchHistoric,
    updateExpense, 
    createExpense, 
    deleteExpense, 
    signInGoogle,
    updateUser,
    sort,
    sortState,
    stringifyOperation,
    stringifyPaymentMethod,
    checkValidationCode,
    generateValidationCode,
    sendCodeEmail,
    storeDataAsync,
    getDataAsync,
    fetchExpensesAsync,
    fetchExpensesMock
};
