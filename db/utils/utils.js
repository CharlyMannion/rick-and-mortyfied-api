const filterArrayObj = (arr, keyToRemove, anotherKey, thirdKey) => {
    const newArr = arr.map(x => ({...x }));
    const returnArr = newArr.map(element => {
        delete element[keyToRemove];
        delete element[anotherKey];
        delete element[thirdKey];
        return element;
    })
    return returnArr;
};

const renameKey = (arr, keyToRename, newName) => {
    const newArr = arr.map(x => ({...x }));
    const returnArr = newArr.map(element => {
        element[newName] = element[keyToRename];
        delete element[keyToRename];
        return element;
    })
    return returnArr;
};

const getName = (arr, keyTarget) => {
    const newArr = arr.map(x => ({...x }));
    const returnArr = newArr.map(element => {
        return element;
    })
    return returnArr;
}

module.exports = { filterArrayObj, renameKey, getName };