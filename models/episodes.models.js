const connection = require("../db/connection");

exports.fetchEpisodes = (queryKey, sentName, sentNumber) => {
    // console.log(sentName, "<-------------- SENTNAME");
    // console.log(sentNumber, "<-------------- sentNumber")
    const validKeys = ['name', 'number'];
    var validReqKey = true
    if (validKeys.includes(queryKey) || queryKey === undefined) {
        console.log(queryKey, "QUERY KEY");
        validReqKey = true;
        console.log(validReqKey, "validReqKey 2");
    } else {
        validReqKey = false;
    }
    console.log(validReqKey, "validReqKey 2");

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
        .then((episodes) => {
            if (episodes.length === 0 || validReqKey === false) return Promise.reject({
                status: 404,
                msg: "Sorry Pal, That Query Was Funky. Episode Not Found!",
            });
            return episodes;
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