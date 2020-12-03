const episodesRouter = require('express').Router();
const { getEpisodes } = require('../controllers/episodes.controller');

episodesRouter.get('/', getEpisodes);

module.exports = episodesRouter;