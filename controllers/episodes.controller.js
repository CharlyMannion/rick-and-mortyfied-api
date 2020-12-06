const { fetchEpisodes, fetchEpisodeById, insertEpisode } = require('../models/episodes.models');

exports.getEpisodes = (req, res, next) => {
    const { query: { name, number } } = req;
    console.log(name, "NAME IN CONTROLLER");
    fetchEpisodes(name, number)
        .then((episodes) => {
            res.status(200).send({ episodes })
        })
        .catch((err) => {
            next(err);
        })
};

exports.getEpisodeById = (req, res, next) => {
    const { episode_id } = req.params;
    fetchEpisodeById(episode_id)
        .then((episodes) => {
            res.status(200).send({ episodes })
        })
        .catch((err) => {
            next(err);
        })
};

exports.postEpisode = (req, res, next) => {
    const { name, air_date, episode, url } = req.body;
    const newEpisode = { name: name, air_date: air_date, episode: episode, url: url };
    insertEpisode(newEpisode)
        .then(([episode]) => {
            res.status(201).send({ episode });
        })
        .catch((err) => {
            next(err);
        })
};