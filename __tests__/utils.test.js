const { filterArrayObj, renameKey, getName } = require('../db/utils/utils');

describe('filterArrayObj', () => {
    it('returns an empty array when passed an empty array', () => {
        const episodesArr = [];
        const keyToRemove = 'characters';
        const actual = filterArrayObj(episodesArr, keyToRemove, 'id', 'created');
        const expected = [];
        expect(actual).toEqual(expected);
    });
    it('removes the specified key value pair from the array of objects', () => {
        const episodesArr = [{
                id: 18,
                name: "Big Trouble in Little Sanchez",
                air_date: "September 13, 2015",
                episode: "S02E07",
                characters: [
                    "https://rickandmortyapi.com/api/character/1",
                    "https://rickandmortyapi.com/api/character/2",
                    "https://rickandmortyapi.com/api/character/3",
                ],
                url: "https://rickandmortyapi.com/api/episode/18",
                created: "2017-11-10T12:56:35.569Z",
            },
            {
                id: 19,
                name: "Interdimensional Cable 2: Tempting Fate",
                air_date: "September 20, 2015",
                episode: "S02E08",
                characters: [
                    "https://rickandmortyapi.com/api/character/1",
                    "https://rickandmortyapi.com/api/character/2",
                    "https://rickandmortyapi.com/api/character/3",
                    "https://rickandmortyapi.com/api/character/4",
                    "https://rickandmortyapi.com/api/character/5",
                    "https://rickandmortyapi.com/api/character/23"
                ],
                url: "https://rickandmortyapi.com/api/episode/19",
                created: "2017-11-10T12:56:35.669Z",
            },
            {
                id: 20,
                name: "Look Who's Purging Now",
                air_date: "September 27, 2015",
                episode: "S02E09",
                characters: [
                    "https://rickandmortyapi.com/api/character/1",
                    "https://rickandmortyapi.com/api/character/2",
                    "https://rickandmortyapi.com/api/character/3"
                ],
                url: "https://rickandmortyapi.com/api/episode/20",
                created: "2017-11-10T12:56:35.772Z",
            },
        ];
        const keyToRemove = 'characters';
        const actual = filterArrayObj(episodesArr, keyToRemove, 'id', 'created');
        const expected = [{
                name: "Big Trouble in Little Sanchez",
                air_date: "September 13, 2015",
                episode: "S02E07",
                url: "https://rickandmortyapi.com/api/episode/18",
            },
            {
                name: "Interdimensional Cable 2: Tempting Fate",
                air_date: "September 20, 2015",
                episode: "S02E08",
                url: "https://rickandmortyapi.com/api/episode/19",
            },
            {
                name: "Look Who's Purging Now",
                air_date: "September 27, 2015",
                episode: "S02E09",
                url: "https://rickandmortyapi.com/api/episode/20",
            },
        ];
        expect(actual).toEqual(expected);
    });
    it('doesn\'t mutate the original array', () => {
        const arr = [
            { shop_name: 'shop-b', owner: 'firstname-b', slogan: 'slogan-b' }
        ];
        const removeFromArr = "owner";
        filterArrayObj(arr, removeFromArr, 'shop_name', 'slogan');
        const arrCopy = [
            { shop_name: 'shop-b', owner: 'firstname-b', slogan: 'slogan-b' }
        ];
        expect(arr).toEqual(arrCopy);
    });
    it('returns a new array', () => {
        const arr = [
            { shop_name: 'shop-b', owner: 'firstname-b', slogan: 'slogan-b' }
        ];
        const removeFromArr = "owner";
        const actual = filterArrayObj(arr, removeFromArr, 'shop_name', 'slogan');
        const expected = [
            { shop_name: 'shop-b', owner_id: 1, slogan: 'slogan-b' }
        ];
        expect(actual[0]).not.toBe(arr[0]);
    });

    describe('renameKey', () => {
        it('returns an empty array when passed an empty array', () => {
            const episodesArr = [];
            const keyToRename = 'id';
            const newName = 'number';
            const actual = renameKey(episodesArr, keyToRename, newName);
            const expected = [];
            expect(actual).toEqual(expected);
        });
        it('renames the specified key in the object', () => {
            const episodesArr = [{
                    id: 18,
                    name: "Big Trouble in Little Sanchez",
                    air_date: "September 13, 2015",
                    episode: "S02E07",
                    characters: [
                        "https://rickandmortyapi.com/api/character/1",
                        "https://rickandmortyapi.com/api/character/2",
                        "https://rickandmortyapi.com/api/character/3",
                    ],
                    url: "https://rickandmortyapi.com/api/episode/18",
                    created: "2017-11-10T12:56:35.569Z",
                },
                {
                    id: 19,
                    name: "Interdimensional Cable 2: Tempting Fate",
                    air_date: "September 20, 2015",
                    episode: "S02E08",
                    characters: [
                        "https://rickandmortyapi.com/api/character/1",
                        "https://rickandmortyapi.com/api/character/2",
                        "https://rickandmortyapi.com/api/character/3",
                        "https://rickandmortyapi.com/api/character/4",
                        "https://rickandmortyapi.com/api/character/5",
                        "https://rickandmortyapi.com/api/character/23"
                    ],
                    url: "https://rickandmortyapi.com/api/episode/19",
                    created: "2017-11-10T12:56:35.669Z",
                },
                {
                    id: 20,
                    name: "Look Who's Purging Now",
                    air_date: "September 27, 2015",
                    episode: "S02E09",
                    characters: [
                        "https://rickandmortyapi.com/api/character/1",
                        "https://rickandmortyapi.com/api/character/2",
                        "https://rickandmortyapi.com/api/character/3"
                    ],
                    url: "https://rickandmortyapi.com/api/episode/20",
                    created: "2017-11-10T12:56:35.772Z",
                },
            ];
            const keyToRename = 'id';
            const newName = 'number';
            const actual = renameKey(episodesArr, keyToRename, newName);
            const expected = [{
                    number: 18,
                    name: "Big Trouble in Little Sanchez",
                    air_date: "September 13, 2015",
                    episode: "S02E07",
                    characters: [
                        "https://rickandmortyapi.com/api/character/1",
                        "https://rickandmortyapi.com/api/character/2",
                        "https://rickandmortyapi.com/api/character/3",
                    ],
                    url: "https://rickandmortyapi.com/api/episode/18",
                    created: "2017-11-10T12:56:35.569Z",
                },
                {
                    number: 19,
                    name: "Interdimensional Cable 2: Tempting Fate",
                    air_date: "September 20, 2015",
                    episode: "S02E08",
                    characters: [
                        "https://rickandmortyapi.com/api/character/1",
                        "https://rickandmortyapi.com/api/character/2",
                        "https://rickandmortyapi.com/api/character/3",
                        "https://rickandmortyapi.com/api/character/4",
                        "https://rickandmortyapi.com/api/character/5",
                        "https://rickandmortyapi.com/api/character/23"
                    ],
                    url: "https://rickandmortyapi.com/api/episode/19",
                    created: "2017-11-10T12:56:35.669Z",
                },
                {
                    number: 20,
                    name: "Look Who's Purging Now",
                    air_date: "September 27, 2015",
                    episode: "S02E09",
                    characters: [
                        "https://rickandmortyapi.com/api/character/1",
                        "https://rickandmortyapi.com/api/character/2",
                        "https://rickandmortyapi.com/api/character/3"
                    ],
                    url: "https://rickandmortyapi.com/api/episode/20",
                    created: "2017-11-10T12:56:35.772Z",
                },
            ];
            expect(actual).toEqual(expected);
        });
        it('doesn\'t mutate the original array', () => {
            const arr = [
                { shop_name: 'shop-b', owner: 'firstname-b', slogan: 'slogan-b' }
            ];
            const keyToRename = "owner";
            const newName = 'dog';
            renameKey(arr, keyToRename, newName);
            const arrCopy = [
                { shop_name: 'shop-b', owner: 'firstname-b', slogan: 'slogan-b' }
            ];
            expect(arr).toEqual(arrCopy);
        });
        it('returns a new array', () => {
            const arr = [
                { shop_name: 'shop-b', owner: 'firstname-b', slogan: 'slogan-b' }
            ];
            const keyToRename = "owner";
            const newName = 'dog';
            const actual = renameKey(arr, keyToRename, newName);
            const expected = [
                { shop_name: 'shop-b', owner_id: 1, slogan: 'slogan-b' }
            ];
            expect(actual[0]).not.toBe(arr[0]);
        });
    });

    describe('getName', () => {
        it('returns an empty array when passed an empty array', () => {
            const charactersArr = [];
            const keyTarget = 'characters';
            const actual = getName(charactersArr, keyTarget);
            const expected = [];
            expect(actual).toEqual(expected);
        });
        it('doesn\'t mutate the original array', () => {
            const arr = [
                { shop_name: 'shop-b', owner: 'firstname-b', slogan: 'slogan-b' }
            ];
            const keyTarget = "owner";
            getName(arr, keyTarget);
            const arrCopy = [
                { shop_name: 'shop-b', owner: 'firstname-b', slogan: 'slogan-b' }
            ];
            expect(arr).toEqual(arrCopy);
        });
        it('returns a new array', () => {
            const arr = [
                { shop_name: 'shop-b', owner: 'firstname-b', slogan: 'slogan-b' }
            ];
            const keyTarget = "owner";
            const actual = getName(arr, keyTarget);
            const expected = [
                { shop_name: 'shop-b', owner_id: 1, slogan: 'slogan-b' }
            ];
            expect(actual[0]).not.toBe(arr[0]);
        });
    })
})