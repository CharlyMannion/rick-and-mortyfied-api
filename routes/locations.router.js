const locationsRouter = require('express').Router();
const { getLocations } = require('../controllers/locations.controller');
const { handle405s } = require('../errors');

locationsRouter.route('/').get(getLocations).all(handle405s);;
// locationsRouter.route('/').get(getLocations).post(postLocation).all(handle405s);

module.exports = locationsRouter;