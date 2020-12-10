const charactersRouter = require('express').Router();
const { getCharacters, postCharacters } = require('../controllers/characters.controller');
const { handle405s } = require('../errors');

charactersRouter.route('/').get(getCharacters).post(postCharacters).all(handle405s);

module.exports = charactersRouter;