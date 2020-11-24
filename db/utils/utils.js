const filterArrayObj = (arr, keyToRemove) => {
    const newArr = arr.map(x => ({...x }));
    const returnArr = newArr.map(element => {
        delete element[keyToRemove];
        return element;
    })
    return returnArr;
}

module.exports = { filterArrayObj };