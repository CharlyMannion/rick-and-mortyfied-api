const { fetchEpisodes, fetchEpisodeById } = require('../models/episodes.models');

exports.getEpisodes = (req, res, next) => {
    fetchEpisodes()
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
}