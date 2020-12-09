const locationsRouter = require('express').Router();
const { getLocations, postLocation } = require('../controllers/locations.controller');
const { handle405s } = require('../errors');

locationsRouter.route('/').get(getLocations).post(postLocation).all(handle405s);;

module.exports = locationsRouter;