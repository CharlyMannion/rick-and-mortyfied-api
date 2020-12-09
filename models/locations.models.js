const connection = require("../db/connection");

exports.fetchLocations = (sentName, sentType, sentDimension) => {
    return connection
        .select("locations.*")
        .from("locations")
        .modify(function(knex) {
            if (sentName) {
                knex.where("locations.name", sentName);
            }
            if (sentType) {
                knex.where("locations.type", sentType);
            }
            if (sentDimension) {
                knex.where("locations.dimension", sentDimension);
            }
        })
        .then((locations) => {
            // if (locations.length === 0 || checkValid(validKeys, queryKey) === false) return Promise.reject({
            if (locations.length === 0) return Promise.reject({
                status: 404,
                msg: "Sorry Pal, That Query Was Funky. Location Not Found!",
            });
            return locations;
        });
}