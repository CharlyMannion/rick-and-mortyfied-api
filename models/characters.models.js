const connection = require("../db/connection");
const { checkValid } = require('../db/utils/modelUtils');

exports.fetchCharacters = (queryKey, sentName, sentStatus, sentSpecies, sentGender) => {
    const validKeys = ['name'];
    return connection
        .select("characters.*")
        .from("characters")
        .modify(function(knex) {
            if (sentName) {
                knex.where("characters.name", sentName);
            }
            if (sentStatus) {
                knex.where("characters.status", sentStatus);
            }
            if (sentSpecies) {
                knex.where("characters.species", sentSpecies);
            }
            if (sentGender) {
                knex.where("characters.gender", sentGender);
            }
        })
}