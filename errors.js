// error controllers:

exports.handleInvalidPath = (req, res, next) => {
    res.status(404).send({ msg: 'oopsie, path not found' });
};