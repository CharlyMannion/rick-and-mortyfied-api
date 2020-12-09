const connection = require("../db/connection");

exports.fetchLocations = () => {
    return connection
        .select("locations.*")
        .from("locations")
}