const knex = require("../db/connection")

exports.fetchEpisodes = () => {
    return knex
        .select('*')
        .from('episodes')
        .then((episodesArr) => {
            console.log(episodesArr, "<=========== episodes ARRAY IN MODEL");
            return episodesArr;
        })
}