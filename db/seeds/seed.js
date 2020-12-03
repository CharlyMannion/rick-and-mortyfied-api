const {
    locationData,
    characterData,
    episodeData,
} = require('../data/index.js');
const { filterArrayObj, renameKey, getName } = require('../utils/utils');


exports.seed = function(knex) {
    // add seeding functionality here
    return knex.migrate
        .rollback()
        .then(() => {
            return knex.migrate.latest();
        })
        .then(() => {
            console.log("LET\'S GET SEEDY!");
            const renameId = renameKey(episodeData, 'id', 'number');
            const formattedEpisodesData = filterArrayObj(renameId, 'characters', 'created');
            return knex('episodes')
                .insert(formattedEpisodesData)
                .returning('*')
        })
        .then(() => {
            const formattedLocationData = filterArrayObj(locationData, 'id', 'residents', 'created');
            return knex('locations')
                .insert(formattedLocationData)
                .returning('*')
        })
        .then(() => {
            const formattedCharacterData = filterArrayObj(characterData, 'id', 'episode', 'created');
            const getOriginName = getName(formattedCharacterData, 'origin');
            const getLocationName = getName(getOriginName, 'location');
            return knex('characters')
                .insert(getLocationName)
                .returning('*')
                .then(() => {})
        })
};