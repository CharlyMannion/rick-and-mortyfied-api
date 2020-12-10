const { fetchCharacters, insertCharacter } = require('../models/characters.models');

exports.getCharacters = (req, res, next) => {
    const { query: { name, status, species, gender } } = req;
    const queryObj = req.query;
    const queryKey = Object.keys(queryObj)[0];
    fetchCharacters(queryKey, name, status, species, gender)
        .then((characters => {
            res.status(200).send({ characters })
        }))
        .catch((err) => {
            next(err);
        })
}

exports.postCharacters = (req, res, next) => {
    const { name, status, species, type, gender, origin, location, image, url } = req.body;
    const newCharacterr = { name: name, status: status, species: species, type: type, gender: gender, origin: origin, location: location, image: image, url: url };
    insertCharacter(newCharacterr)
        .then(([character]) => {
            res.status(201).send({ character });
        })
        .catch((err) => {
            next(err);
        })
};