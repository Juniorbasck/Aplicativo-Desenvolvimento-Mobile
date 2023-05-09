const USE_MOCK_DATA = true;

const GENERATE_MOCK_DATA = false;

const EXPENSES = 10;

const FILE = 'expenses.json';

const getExpenses = (onFetchData, email='') => {
    if (USE_MOCK_DATA) {
        let fs = require('react-native-fs');
        if (GENERATE_MOCK_DATA) {
            fs.writeFile(FILE, JSON.stringify(generateExpenseData(EXPENSES)));
        }
        let expenses;
        try {
            expenses = JSON.parse(fs.readFile(FILE));
        } catch(e) {
            expenses = generateExpenseData(EXPENSES);
            fs.writeFile(FILE, JSON.stringify(expenses));
        }
        onFetchData(expenses);
    } else {
        // Fetch data from database using `email` as primary key.
    }
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function generateExpenseData(qtd=10, priceLimit=10000) {
    let randomWords = require('random-words');
    let expenses = [];
    for (let i = 0; i < qtd; i++) {
        expenses.push(
            {
                id: i + 1,
                title: randomWords({
                    exactly: 1,
                    wordsPerString: Math.ceil(Math.random() * 2),
                    formatter: (word, index) => {
                        return index === 0 ? word.slice(0, 1).toUpperCase().concat(word.slice(1)) : word;
                    }
                })[0],
                entity: randomWords({
                    exactly: 1,
                    wordsPerString: Math.ceil(Math.random() * 2),
                    formatter: (word, index) => {
                        return index === 0 ? word.slice(0, 1).toUpperCase().concat(word.slice(1)) : word;
                    }
                })[0],
                price: parseFloat((Math.random() * priceLimit).toFixed(2)),
                dueDate: randomDate(new Date(2023, 0, 1),  new Date(2024, 0, 1)),
                paid: !!(parseInt(Math.round(Math.random() * 1)))
            }
        );
    }
    return expenses.sort((ele) => ele.dueDate);
}

export { getExpenses };
