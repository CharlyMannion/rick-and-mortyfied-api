const { fetchLocations } = require('../models/locations.models');

exports.getLocations = (req, res, next) => {
    const { query: { name, type, dimension } } = req;
    fetchLocations(name, type, dimension)
        .then((locations) => {
            res.status(200).send({ locations })
        })
        .catch((err) => {
            next(err);
        })
}