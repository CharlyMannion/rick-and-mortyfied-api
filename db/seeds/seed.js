const {
    locationData,
    characterData,
    episodeData,
} = require('../data/index.js');

exports.seed = function(knex) {
    // add seeding functionality here
    return knex.migrate
        .rollback()
        .then(() => {
            return knex.migrate.latest();
        })
        .then(() => {
            console.log("LET\'S GET SEEDY!");
        })
};