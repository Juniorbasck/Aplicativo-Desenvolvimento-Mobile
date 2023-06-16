const format = (date, sep='-', splitBy='-') => {
    if (!date)
        return '';
    let dateParts = date.split(splitBy);
    return dateParts[0] + sep + dateParts[1] + sep + dateParts[2];
}

function getFormattedTodayDate() {
    let date = new Date();
    let month = (date.getMonth() + 1).toString();
    if (month.length == 1) 
        month = '0' + month;
    return date.getFullYear() + '-' + month + '-' + date.getDate();
}

function getValidBirthdayDate(minAge) {
    let today = new Date();
    let pastAge =  new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    let month = (pastAge.getMonth() + 1).toString();
    if (month.length == 1)
        month = '0' + month;
    return pastAge.getFullYear() + '-' + month + '-' + pastAge.getDate();
}

function toDate(dateStr) {
    let split = dateStr.split('-');
    return new Date(split[0], parseInt(split[1]) - 1, split[2], 1);
}

function isValidBirthdayDate(date, minAge) {
    return toDate(date) <= toDate(getValidBirthdayDate(minAge));
}

export { 
    format, 
    getFormattedTodayDate, 
    getValidBirthdayDate,
    isValidBirthdayDate
};