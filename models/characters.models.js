const connection = require("../db/connection");
const { checkValid } = require('../db/utils/modelUtils');

exports.fetchCharacters = (queryKey, sentName, sentStatus, sentSpecies, sentGender) => {
    const validKeys = ['name', 'status', 'species', 'gender'];
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
        .then((characters) => {
            if (characters.length === 0 || checkValid(validKeys, queryKey) === false) return Promise.reject({
                status: 404,
                msg: "Sorry Pal, That Query Was Funky. Character Not Found!",
            });
            return characters;
        });
}

exports.insertCharacter = (characterBody) => {
    return connection("characters").insert(characterBody).returning("*");
};

exports.fetchCharacterById = (sentCharacterId) => {
    return connection
        .select("characters.*")
        .from("characters")
        .where("characters.character_id", sentCharacterId)
        .then((character) => {
            if (character.length < 1)
                return Promise.reject({
                    status: 404,
                    msg: "Sorry Pal, Character Not Found!",
                });
            return character;
        });
};

exports.updateCharacter = (patchCharacterId, sentLocation) => {
    console.log(sentLocation);
    if (sentLocation === undefined) {
        return Promise.reject({ status: 400, msg: "No Can Do Pal, Bad Request. Fix Ya Body!" });
    }
    if (sentLocation !== 'undefined' || sentLocation) {
        return connection
            .select("characters.*")
            .from("characters")
            .where("characters.character_id", patchCharacterId)
            .update("location", sentLocation)
            .then(() => {
                return connection
                    .select("characters.*")
                    .from("characters")
                    .where("characters.character_id", patchCharacterId)
                    .then((character) => {
                        if (character.length < 1)
                            return Promise.reject({
                                status: 404,
                                msg: "Sorry Pal, Character Not Found!",
                            });
                        else return character;
                    });
            });
    }
};