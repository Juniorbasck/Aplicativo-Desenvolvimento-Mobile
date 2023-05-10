import expenses from './expenses.json';

const USE_MOCK_DATA = true;

const sort = exps => {
    let sorted = exps.sort((exp1, exp2) => new Date(exp1.dueDate).getTime() - new Date(exp2.dueDate).getTime());
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

export { getExpenses };
