const { fetchEpisodes } = require('../models/episodes.models');

exports.getEpisodes = (req, res, next) => {
    fetchEpisodes()
        .then((episodes) => {
            res.status(200).send({ episodes })
        })
        .catch((err) => {
            next(err);
        })
}