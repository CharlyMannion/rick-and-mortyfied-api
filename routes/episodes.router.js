const episodesRouter = require('express').Router();
const { getEpisodes } = require('../controllers/episodes.controller');
const { handle405s } = require('../errors');

episodesRouter.route('/').get(getEpisodes).all(handle405s);

module.exports = episodesRouter;