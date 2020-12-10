const charactersRouter = require('express').Router();
const { getCharacters } = require('../controllers/characters.controller');
const { handle405s } = require('../errors');

charactersRouter.route('/').get(getCharacters).all(handle405s);

module.exports = charactersRouter;