const locationsRouter = require('express').Router();
const { getLocations } = require('../controllers/locations.controller');

locationsRouter.route('/').get(getLocations);
// locationsRouter.route('/').get(getLocations).post(postLocation).all(handle405s);

module.exports = locationsRouter;