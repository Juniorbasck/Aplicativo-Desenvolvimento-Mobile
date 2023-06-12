import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import expenses from './expenses.json';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { 
    doc,
    collection,
    getDoc, 
    setDoc,
    getDocs,
    updateDoc,
    arrayUnion,
    arrayRemove,
    increment,
} from 'firebase/firestore';
import { db } from './firebase.config';

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

const emailNotTaken = async email => {
    const collecRef = collection(db, 'users');
    const theDocs = await getDocs(collecRef);
    let answer = true;
    theDocs.forEach(doc => {
        if (doc.id === email)
            answer = false;
    });
    return answer;
};

const usernameNotTaken = async username => {
    const collecRef = collection(db, 'users');
    const theDocs = await getDocs(collecRef);
    let docData;
    let answer = true;
    theDocs.forEach(doc => {
        docData = doc.data();
        if (docData.username === username)
            answer = false;
    });
    return answer;
};

const createNewUser = async (name, surname, username, email) => {
    const docRef = doc(db, 'users', email);
    // Create user data document.
    await setDoc(docRef, {
        name: name,
        surname: surname,
        username: username,
        email: email,
        id: await nextUserIdAsync(),
        image: null
    });
    // Create user expenses document.
    const expDocRef = doc(db, 'expenses', email);
    await setDoc(expDocRef, {
        expenses: [],
        nextId: 1
    });
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

const fetchUserDataAsync = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const docRef = doc(db, 'users', currentUser.email);
    const theDoc = await getDoc(docRef);
    return theDoc.data();
};

const fetchUserDataMock = () => {
    return {
        name: 'Marinna',
        surname: 'Silva',
        username: 'mari123',
        email: 'mari123@gmail.com'
    };
};

const updateExpenseAsync = async (oldExpense, updatedExpense) => {
    updatedExpense.price = parseFloat(updatedExpense.price);
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const docRef = doc(db, 'expenses', currentUser.email);
    const theDoc = await getDoc(docRef);
    let expenses = theDoc.get('expenses');
    expenses.forEach(e => {
        if (
            e.id !== updatedExpense.id &&
            e.title === updatedExpense.title && 
            e.entity === updatedExpense.entity && 
            e.price === updatedExpense.price &&
            e.date === updatedExpense.date &&
            e.paymentMethod === updatedExpense.paymentMethod
        ) {
            throw new Error('Já existe uma despesa com esses mesmos dados. Tente novamente mudando os valores dos campos');
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

const createExpenseAsync = async (title, entity, date, price, paymentMethod, image, paid) => {
    let newExpense = {
        id: await currentUserExpenseNextIdAsync(),
        title: title,
        entity: entity,
        date: date,
        price: parseFloat(price),
        paymentMethod: paymentMethod,
        image: null,
        paid: paid
    };
    // console.log(newExpense);
    const auth = getAuth();
    const currentUser = auth.currentUser;
    // Check if the new expense is not repeated.
    const docRef = doc(db, 'expenses', currentUser.email);
    const theDoc = await getDoc(docRef);
    let expenses = theDoc.get('expenses');
    expenses.forEach(e => {
        if (
            e.id !== newExpense.id, // The id is used to differentiate one expense from the others.
            e.title === title && 
            e.entity === entity && 
            e.price === price &&
            e.date === date &&
            e.paymentMethod === paymentMethod
        ) {
            throw new Error('Já existe uma despesa com esses mesmos dados. Tente novamente mudando os valores dos campos');
        }
    });
    await updateDoc(docRef, {
        expenses: arrayUnion(newExpense)
    });
}

const currentUserExpenseNextIdAsync = async _ => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const docRef = doc(db, 'expenses', currentUser.email);
    const theDoc = await getDoc(docRef);
    let nextId = theDoc.get('nextId');
    await updateDoc(docRef, {
        nextId: increment(1)
    });
    return nextId;
};

const nextUserIdAsync = async _ => {
    const docRef = doc(db, 'config', 'nextUserId');
    const theDoc = await getDoc(docRef);
    let nextUserId = theDoc.get('nextUserId');
    await updateDoc(docRef, {
        nextUserId: increment(1)
    });
    return nextUserId;
};

const deleteExpenseAsync = async expense => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const docRef = doc(db, 'expenses', currentUser.email);
    await updateDoc(docRef, {
        expenses: arrayRemove(expense)
    });
};

const signInGoogle = () => {

    const provider = new GoogleAuthProvider();
    
    signInWithPopup(auth, provider)
    .then((result) => {
        console.log(result);
        // The signed-in user info.
    })
    .catch((error) => {
        console.log(error);
    });
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

const updateUserAsync = async newUserData => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    // Check if username is not already taken.
    const users = collection(db, 'users');
    const querySnapshot = await getDocs(users);
    querySnapshot.forEach(doc => {
        if (doc.id != currentUser.email) {
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
    sort,
    sortState,
    emailNotTaken,
    usernameNotTaken,
    fetchExpensesAsync,
    fetchExpensesMock,
    updateExpenseAsync,
    createExpenseAsync,
    deleteExpenseAsync,
    updateUserAsync,
    getPaymentMethods,
    fetchUserDataAsync,
    fetchUserDataMock,
    fetchHistoric,
    signInGoogle,
    stringifyOperation,
    stringifyPaymentMethod,
    checkValidationCode,
    generateValidationCode,
    sendCodeEmail,
    storeDataAsync,
    getDataAsync,
    createNewUser
};
