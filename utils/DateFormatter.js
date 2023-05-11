const format = (date, sep='/') => {
    if (typeof(date) != 'date') {
        try {
            date = new Date(date);
        } catch (err) {
            console.log(`Error parsing date: ${date}`)
        }
    }
    let month = (date.getMonth() + 1).toString();
    if (month.length == 1) {
        month = '0' + month;
    }
    return date.getFullYear() + sep + month + sep + date.getDate();
}

export { format };
