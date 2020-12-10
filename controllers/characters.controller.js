const { fetchCharacters } = require('../models/characters.models');

exports.getCharacters = (req, res, next) => {
    fetchCharacters()
        .then((characters => {
            res.status(200).send({ characters })

        }))
}