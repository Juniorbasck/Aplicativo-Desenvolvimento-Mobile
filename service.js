import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import expenses from './expenses.json';
import { 
    AuthCredential, 
    EmailAuthProvider, 
    getAuth, 
    GoogleAuthProvider, 
    reauthenticateWithCredential,
    signInWithPopup,
    updatePassword,
    
} from 'firebase/auth';
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
import {
    ref,
    uploadBytes,
    deleteObject,
    getDownloadURL
} from 'firebase/storage';
import { 
    firestore,
    storage
} from './firebase.config';

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

const usernameNotTaken = async username => {
    const collecRef = collection(firestore, 'users');
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

const createNewUserAsync = async (
    name, 
    surname, 
    username, 
    birthdayDate, 
    street,
    city,
    postcode,
    email
) => {
    const docRef = doc(firestore, 'users', email);
    // Create user data document.
    await setDoc(docRef, {
        name: name,
        surname: surname,
        username: username,
        birthdayDate: birthdayDate,
        street: street,
        city: city,
        postcode: postcode,
        email: email,
        id: await nextUserIdAsync(),
        image: null
    });
    // Create user expenses document.
    const expDocRef = doc(firestore, 'expenses', email);
    await setDoc(expDocRef, {
        expenses: [],
        nextId: 1
    });
    // Create user historic.
    const histDocRef = doc(firestore, 'historics', email);
    await setDoc(histDocRef, {
        historic: []
    });
    // Update nextUserId.
    await updateDoc(doc(firestore, 'admin', 'config'), {
        nextUserId: increment(1)
    });
};

const saveHistoric = async data => {
    const currentUser = getAuth().currentUser;
    const histDocRef = doc(firestore, 'historics', currentUser.email);
    await updateDoc(histDocRef, {
        historic: arrayUnion(data)
    });
};

const fetchExpensesAsync = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const docRef = doc(firestore, 'expenses', currentUser.email);
    const theDoc = await getDoc(docRef);
    let temp = theDoc.data();
    temp.expenses.forEach(async e => {
        if (e.image) { // If there's an image.
            try {
                await fetch(e.image.uri); // Try to fetch it from the local storage of the phone.
            } catch (err) { // If not found, download from the cloud.
                await getDownloadURL(ref(storage, 'users/' + currentUser.email + `/images/expenses/expense${e.id}/expense.jpeg`));
            }
        }
    });
    return sort(temp.expenses);
};

const fetchExpensesMock = () => {
    return sort(expenses);
}

const fetchUserDataAsync = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const docRef = doc(firestore, 'users', currentUser.email);
    const theDoc = await getDoc(docRef);
    let data = theDoc.data();
    if (data.image) {
        try {
            await fetch(data.image.uri); // Check if the image is present locally.
        } catch (err) { // If not, download it from the cloud.
            await getDownloadURL(ref(storage, 'users/' + currentUser.email + '/images/profile/profile.jpeg'));
        }
    }
    return data;
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
    const docRef = doc(firestore, 'expenses', currentUser.email);
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
    const imagePath = 'users/' + currentUser.email + `/images/expenses/expense${updatedExpense.id}/expense.jpeg`;
    const imageRef = ref(storage, imagePath);
    if (oldExpense.image) { // Delete from the cloud.
        try {
            await deleteObject(imageRef);
        } catch(err) {
            console.log('Error when trying to delete the profile image ------');
            console.log(err.message);
        }
    }
    if (updatedExpense.image) { // Upload to the cloud.
        const imageResponse = await fetch(updatedExpense.image.uri);
        const imageBlob = await imageResponse.blob();
        await uploadBytes(imageRef, imageBlob);
    }
    // Save historic.
    let historic = {
        timestamp: new Date().toISOString(),
        date: updatedExpense.date,
        expenseTitle: updatedExpense.title,
        entity: updatedExpense.entity,
        paymentMethod: updatedExpense.paymentMethod,
        price: updatedExpense.price,
        paid: updatedExpense.paid,
        operation: 2
    };
    await saveHistoric(historic);
}

const createNewExpenseAsync = async (title, issuer, date, price, paymentMethod, image, paid) => {
    let newExpense = {
        id: await nextExpenseIdAsync(),
        title: title,
        issuer: issuer,
        date: date,
        price: parseFloat(price),
        paymentMethod: await stringifyPaymentMethodAsync(paymentMethod),
        image: image,
        paid: paid
    };
    const auth = getAuth();
    const currentUser = auth.currentUser;
    // Check if the new expense is not repeated.
    const docRef = doc(firestore, 'expenses', currentUser.email);
    const theDoc = await getDoc(docRef);
    let expenses = theDoc.get('expenses');
    expenses.forEach(e => {
        if (
            e.id !== newExpense.id, // The id is used to differentiate one expense from the others.
            e.title === title && 
            e.issuer === issuer && 
            e.price === newExpense.price &&
            e.date === date &&
            e.paymentMethod === paymentMethod
        ) {
            throw new Error('Já existe uma despesa com esses mesmos dados. Tente novamente mudando os valores dos campos');
        }
    });
    await updateDoc(docRef, {
        expenses: arrayUnion(newExpense),
        nextId: increment(1)
    });
    if (newExpense.image) { // If there's an image, save it to firebase storage.
        const imagePath = 'users/' + currentUser.email + `/images/expenses/expense${newExpense.id}/expense.jpeg`;
        const imageRef = ref(storage, imagePath);
        const imageResponse = await fetch(newExpense.image.uri);
        const imageBlob = await imageResponse.blob();
        await uploadBytes(imageRef, imageBlob);
    }
    // Save historic.
    let historic = {
        timestamp: new Date().toISOString(),
        date: newExpense.date,
        expenseTitle: newExpense.title,
        issuer: newExpense.issuer,
        paymentMethod: newExpense.paymentMethod,
        price: newExpense.price,
        paid: newExpense.paid,
        operation: 'Criação'
    };
    await saveHistoric(historic);
}

const nextExpenseIdAsync = async _ => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const docRef = doc(firestore, 'expenses', currentUser.email);
    const theDoc = await getDoc(docRef);
    return theDoc.get('nextId');
};

const nextUserIdAsync = async _ => {
    const docRef = doc(firestore, 'admin', 'config');
    const theDoc = await getDoc(docRef);
    return theDoc.get('nextUserId');
};

const deleteExpenseAsync = async expense => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const docRef = doc(firestore, 'expenses', currentUser.email);
    await updateDoc(docRef, {
        expenses: arrayRemove(expense)
    });
    // Try to remove the image of the expense.
    const imageRef = ref(storage, 'users/' + currentUser.email + `/images/expenses/expense${expense.id}/expense.jpeg`);
    try {
        await deleteObject(imageRef);
    } catch (err) {
        console.log('Error when trying to delete object at ' + imageRef.fullPath);
        console.log(err.message);
    }
    // Save historic.
    let historic = {
        timestamp: new Date().toISOString(),
        date: expense.date,
        expenseTitle: expense.title,
        issuer: expense.issuer,
        paymentMethod: expense.paymentMethod,
        price: expense.price,
        paid: expense.paid,
        operation: 'Deleção'
    };
    await saveHistoric(historic);
};

const signInGoogle = () => {
    Alert.alert('Login com Google');
}

const getPaymentMethods = _ => {
    return [
        {"value": 1, "label": "Cartão de crédito"},
        {"value": 2, "label": "Débito direto"},
        {"value": 3, "label": "Transferência"},
        {"value": 4, "label": "MBWay"},
        {"value": 5, "label": "Cheque"},
        {"value": 6, "label": "Monetário"}
    ];
};

const getPaymentMethodsAsync = async onGet => {
    const configDoc = await getConfigDocAsync();
    onGet(configDoc.get('paymentMethods'));
};

const updateUserAsync = async newUserData => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    // Check if username is not already taken.
    const users = collection(firestore, 'users');
    const querySnapshot = await getDocs(users);
    querySnapshot.forEach(doc => {
        if (doc.id != currentUser.email) {
            if (doc.get('username') === newUserData.username) {
                throw new Error(`O nome de utilizador '${newUserData.username}' já está sendo usado`);
            }
        }
    });
    const profileImagePath = 'users/' + currentUser.email + '/images/profile/profile.jpeg';
    const profileRef = ref(storage, profileImagePath);
    if (newUserData.image) { // If there's an image, save it to firebase storage.
        const imageResponse = await fetch(newUserData.image.uri);
        const imageBlob = await imageResponse.blob();
        await uploadBytes(profileRef, imageBlob);
        getDownloadURL(profileRef)
        .then(url => {
            newUserData.image = {uri: url}
        });
    } else { // Else, try to delete the one that's in the firebase storage if any.
        try {
            await deleteObject(profileRef);
        } catch(err) {
            console.log('Error when trying to delete the profile image ------');
            console.log(err.message);
        }
    }
    const docRef = doc(firestore, 'users', currentUser.email);
    await updateDoc(docRef, newUserData);
};

const reauthenticate = async password => {
    let auth = getAuth();
    let currentUser = auth.currentUser;
    let credential = EmailAuthProvider.credential(currentUser.email, password);
    try {
        await reauthenticateWithCredential(currentUser, credential);
        return true;
    } catch(err) {
        return false;
    }
};

const updatePasswd = async newPassword => {
    let auth = getAuth();
    const currentUser = auth.currentUser;
    try {
        await updatePassword(currentUser, newPassword);
    } catch (err) {
        console.log('Error when trying to update password -----');
        console.log(err.message);
    }
};

const fetchHistoricAsync = async () => {
    const histDocRef = doc(firestore, 'historics', getAuth().currentUser.email);
    const theDoc = await getDoc(histDocRef);
    return theDoc.get('historic');
};

const emailExistsOnAppAsync = async email => {
    const collRef = collection(firestore, 'users');
    const theDocs = await getDocs(collRef);
    let res = false;
    theDocs.forEach(theDoc => {
        if (theDoc.id === email)
            res = true;
    });
    return res;
};

const getConfigDocAsync = async _ => {
    const docRef = doc(firestore, 'admin', 'config');
    return await getDoc(docRef);
};

const getUserMinAgeAsync = async _ => {
    const configDoc = await getConfigDocAsync();
    return configDoc.get('userMinAge');
};

const getCitiesAsync = async _ => {
    const configDoc = await getConfigDocAsync();
    return configDoc.get('cities');
};

const getIssuersAsync = async _ => {
    const configDoc = await getConfigDocAsync();
    return configDoc.get('issuers');
};

const fetchHistoricMock = () => {
    return [
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
};

const stringifyOperation = operation => {
    switch (operation) {
        default:
        case 1: return 'Criação';
        case 2: return 'Alteração';
        case 3: return 'Deleção';
    }
};

const stringifyPaymentMethodAsync = async paymentMethod => {
    const configDoc = await getConfigDocAsync();
    const methods = configDoc.get('paymentMethods');
    let str;
    methods.forEach(m => {
        if (m.value === paymentMethod)
            str = m.label;
    });
    if (!str)
        throw new Error(`Método de pagamento não encontrado para valor ${paymentMethod}`);
    return str;
};

const stringifyPaymentMethod = async paymentMethod => {
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

const getDefaultPaymentMethodOfAsync = async issuer => {
    const configDoc = await getConfigDocAsync();
    const issuers = configDoc.get('issuers');
    let result;
    issuers.forEach(i => {
        if (i.name.toLowerCase() === issuer.toLowerCase())
            result = i.defaultPaymentMethod;
    });
    if (!result)
        throw new Error('Método de pagamento padrão não encontrado para ' + issuer);
    return result;
};

export { 
    sort,
    sortState,
    usernameNotTaken,
    fetchExpensesAsync,
    fetchExpensesMock,
    updateExpenseAsync,
    createNewExpenseAsync,
    deleteExpenseAsync,
    updateUserAsync,
    getPaymentMethods,
    getPaymentMethodsAsync,
    fetchUserDataAsync,
    fetchUserDataMock,
    fetchHistoricAsync,
    fetchHistoricMock,
    signInGoogle,
    stringifyOperation,
    stringifyPaymentMethod,
    storeDataAsync,
    getDataAsync,
    createNewUserAsync,
    reauthenticate,
    updatePasswd,
    emailExistsOnAppAsync,
    getUserMinAgeAsync,
    getCitiesAsync,
    getIssuersAsync,
    getDefaultPaymentMethodOfAsync
};
