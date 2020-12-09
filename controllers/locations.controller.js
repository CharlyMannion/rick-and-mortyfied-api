const { fetchLocations } = require('../models/locations.models');

exports.getLocations = (req, res, next) => {
    fetchLocations()
        .then((locations => {
            res.status(200).send({ locations })

        }))
}