const { fetchCharacters } = require('../models/characters.models');

exports.getCharacters = (req, res, next) => {
    const { query: { name } } = req;
    const queryObj = req.query;
    const queryKey = Object.keys(queryObj)[0];
    fetchCharacters(queryKey, name)
        .then((characters => {
            res.status(200).send({ characters })
        }))
        .catch((err) => {
            next(err);
        })
}