const connection = require("../db/connection");

exports.fetchCharacters = () => {
    return connection
        .select("characters.*")
        .from("characters")
}