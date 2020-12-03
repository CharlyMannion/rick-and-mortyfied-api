// error handling middleware functions (EHMF):

exports.handle500s = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: 'UHOH server error' });
};

// error controllers:

exports.handleInvalidPath = (req, res, next) => {
    res.status(404).send({ msg: 'oopsie, path not found' });
};