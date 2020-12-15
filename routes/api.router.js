const apiRouter = require('express').Router();
const episodesRouter = require('./episodes.router');
const locationsRouter = require('./locations.router');
const charactersRouter = require('./characters.router');

apiRouter.use('/episodes', episodesRouter);
apiRouter.use('/locations', locationsRouter);
apiRouter.use('/characters', charactersRouter);

// apiRouter.get('/', (req, res) => {
//     res.json({
//         '/api/episodes': ['GET', 'POST'],
//         '/api/episodes/:episode_id': ['GET'],
//         '/api/locations': ['GET', 'POST'],
//         '/api/locations/:location_id': ['GET'],
//         '/api/characters/': ['POST', 'GET'],
//         '/api/characters/:character_id': ['PATCH', 'GET'],
//     })
// })

module.exports = apiRouter;