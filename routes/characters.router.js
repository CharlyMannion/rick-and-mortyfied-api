const charactersRouter = require('express').Router();
const { getCharacters, postCharacters, getCharacterById, patchCharacterById } = require('../controllers/characters.controller');
const { handle405s } = require('../errors');

charactersRouter.route('/').get(getCharacters).post(postCharacters).all(handle405s);

charactersRouter.route('/:character_id').get(getCharacterById).patch(patchCharacterById).all(handle405s);

module.exports = charactersRouter;