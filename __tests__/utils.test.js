const { expect } = require('@jest/globals');
const { filterArrayObj } = require('../db/utils/utils');

describe('filterArrayObj', () => {
    it('returns an empty array when passed an empty array', () => {
        const episodesArr = [];
        const keyToRemove = 'characters';
        const actual = filterArrayObj(episodesArr, keyToRemove);
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
        const actual = filterArrayObj(episodesArr, keyToRemove);
        const expected = [{
                id: 18,
                name: "Big Trouble in Little Sanchez",
                air_date: "September 13, 2015",
                episode: "S02E07",
                url: "https://rickandmortyapi.com/api/episode/18",
                created: "2017-11-10T12:56:35.569Z",
            },
            {
                id: 19,
                name: "Interdimensional Cable 2: Tempting Fate",
                air_date: "September 20, 2015",
                episode: "S02E08",
                url: "https://rickandmortyapi.com/api/episode/19",
                created: "2017-11-10T12:56:35.669Z",
            },
            {
                id: 20,
                name: "Look Who's Purging Now",
                air_date: "September 27, 2015",
                episode: "S02E09",
                url: "https://rickandmortyapi.com/api/episode/20",
                created: "2017-11-10T12:56:35.772Z",
            },
        ];
        expect(actual).toEqual(expected);
    })
})