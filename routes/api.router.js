const apiRouter = require('express').Router();
const episodesRouter = require('./episodes.router');
const locationsRouter = require('./locations.router');

apiRouter.use('/episodes', episodesRouter);
apiRouter.use('/locations', locationsRouter);

module.exports = apiRouter;