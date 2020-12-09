const connection = require("../db/connection");
const { checkValid } = require('../db/utils/modelUtils');

exports.fetchLocations = (queryKey, sentName, sentType, sentDimension) => {
    const validKeys = ['name', 'type', 'dimension'];
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
            if (locations.length === 0 || checkValid(validKeys, queryKey) === false) return Promise.reject({
                status: 404,
                msg: "Sorry Pal, That Query Was Funky. Location Not Found!",
            });
            return locations;
        });
};

exports.insertLocation = (locationBody) => {
    return connection("locations").insert(locationBody).returning("*");
};

exports.fetchLocationById = (sentLocationId) => {
    return connection
        .select("locations.*")
        .from("locations")
        .where("locations.location_id", sentLocationId)
        .then((location) => {
            if (location.length < 1)
                return Promise.reject({
                    status: 404,
                    msg: "Sorry Pal, Location Not Found!",
                });
            return location;
        });
};