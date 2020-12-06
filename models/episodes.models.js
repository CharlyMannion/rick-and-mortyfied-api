const connection = require("../db/connection");

exports.fetchEpisodes = (sentName, sentNumber) => {
    return connection
        .select("episodes.*")
        .from('episodes')
        .modify(function(knex) {
            if (sentName) {
                knex.where("episodes.name", sentName);
            }
            if (sentNumber) {
                knex.where("episodes.number", sentNumber);
            }
        })
        .then((episode) => {
            if (episode.length < 1)
                return Promise.reject({
                    status: 404,
                    msg: "Sorry Pal, That Query Was Funky. Episode Not Found!",
                });
            return episode;
        });
};

exports.fetchEpisodeById = (sentEpisodeId) => {
    return connection
        .select("episodes.*")
        .from("episodes")
        .where("episodes.episode_id", sentEpisodeId)
        .then((episode) => {
            if (episode.length < 1)
                return Promise.reject({
                    status: 404,
                    msg: "Sorry Pal, Episode Not Found!",
                });
            return episode;
        });
};

exports.insertEpisode = (episodeBody) => {
    return connection("episodes").insert(episodeBody).returning("*");
};