const knex = require("../db/connection")

exports.fetchEpisodes = () => {
    return knex
        .select('*')
        .from('episodes')
        .then((episodesArr) => {
            // console.log(episodesArr, "<=========== episodes ARRAY IN MODEL");
            return episodesArr;
        })
}

exports.fetchEpisodeById = (sentEpisodeId) => {
    return knex
        .select('episodes.*')
        .from('episodes')
        .where('episodes.episode_id', sentEpisodeId)
        .then((episode) => {
            // console.log(episodesArr, "<=========== episodes ARRAY IN MODEL");
            return episode;
        })
}