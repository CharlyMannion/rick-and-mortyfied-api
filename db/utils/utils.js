const filterArrayObj = (arr, keyToRemove) => {
    const newArr = arr.map(x => ({...x }));
    return newArr;
}

module.exports = { filterArrayObj };