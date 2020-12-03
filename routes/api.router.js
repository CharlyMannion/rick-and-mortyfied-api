const apiRouter = require('express').Router();

const episodesRouter = require('./episodes.router');

apiRouter.use('/episodes', episodesRouter);

module.exports = apiRouter;