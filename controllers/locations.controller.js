const { fetchLocations, insertLocation, fetchLocationById } = require('../models/locations.models');

exports.getLocations = (req, res, next) => {
    const { query: { name, type, dimension } } = req;
    const queryObj = req.query;
    const queryKey = Object.keys(queryObj)[0];
    fetchLocations(queryKey, name, type, dimension)
        .then((locations) => {
            res.status(200).send({ locations })
        })
        .catch((err) => {
            next(err);
        })
};

exports.postLocation = (req, res, next) => {
    const { name, type, dimension, url } = req.body;
    const newLocation = { name: name, type: type, dimension: dimension, url: url };
    insertLocation(newLocation)
        .then(([location]) => {
            res.status(201).send({ location });
        })
        .catch((err) => {
            next(err);
        })
};

exports.getLocationById = (req, res, next) => {
    const { location_id } = req.params;
    fetchLocationById(location_id)
        .then((locations) => {
            res.status(200).send({ locations })
        })
        .catch((err) => {
            next(err);
        })
};