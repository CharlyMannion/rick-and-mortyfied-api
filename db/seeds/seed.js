const {
    locationData,
    characterData,
    episodeData,
} = require('../data/index.js');
const { filterArrayObj, renameKey } = require('../utils/utils');


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
                .then((insertedEpisodes) => {
                    console.log(insertedEpisodes);
                })
        })
        .then(() => {
            const formattedLocationData = filterArrayObj(locationData, 'id', 'residents', 'created');
            return knex('locations')
                .insert(formattedLocationData)
                .returning('*')
                .then((insertedLocations) => {
                    console.log(insertedLocations);
                })
        })
};