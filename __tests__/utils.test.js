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
})