const { fetchLocations } = require('../models/locations.models');

exports.getLocations = (req, res, next) => {
    const { query: { name, type, dimension } } = req;
    // const queryObj = req.query;
    // const queryKey = Object.keys(queryObj)[0];
    fetchLocations(name, type, dimension)
        .then((locations) => {
            res.status(200).send({ locations })
        })
        .catch((err) => {
            next(err);
        })
}