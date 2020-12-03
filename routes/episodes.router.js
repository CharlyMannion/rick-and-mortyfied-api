const episodesRouter = require('express').Router();
const { getEpisodes, getEpisodeById } = require('../controllers/episodes.controller');
const { handle405s } = require('../errors');

episodesRouter.route('/').get(getEpisodes).all(handle405s);

episodesRouter.route('/:episode_id').get(getEpisodeById).all(handle405s);

module.exports = episodesRouter;