const apiRouter = require('express').Router();
const episodesRouter = require('./episodes.router');
const locationsRouter = require('./locations.router');
const charactersRouter = require('./characters.router');


apiRouter.use('/episodes', episodesRouter);
apiRouter.use('/locations', locationsRouter);
apiRouter.use('/characters', charactersRouter);

module.exports = apiRouter;