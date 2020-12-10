const connection = require("../db/connection");
const { checkValid } = require('../db/utils/modelUtils');

exports.fetchCharacters = (queryKey, sentName) => {
    const validKeys = ['name'];
    return connection
        .select("characters.*")
        .from("characters")
        .modify(function(knex) {
            if (sentName) {
                knex.where("characters.name", sentName);
            }
        })
}