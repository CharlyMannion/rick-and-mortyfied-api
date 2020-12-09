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
}