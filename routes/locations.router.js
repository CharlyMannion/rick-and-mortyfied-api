const locationsRouter = require('express').Router();
const { getLocations, postLocation, getLocationById } = require('../controllers/locations.controller');
const { handle405s } = require('../errors');

locationsRouter.route('/').get(getLocations).post(postLocation).all(handle405s);

locationsRouter.route('/:location_id').get(getLocationById).all(handle405s);

module.exports = locationsRouter;