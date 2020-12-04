// error handling middleware functions (EHMF):

exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status) res.status(err.status).send({ msg: err.msg });
    else next(err);
};

// exports.handlePsqlErrors = (err, req, res, next) => {
//     const psqlBadRequestCodes = [];
//     if (psqlBadRequestCodes.includes(err.code))
//         res.status(400).send({ msg: "No can do, bad request!" });
//     else next(err);
// };

exports.handleServerErrors = (err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: "UHOH server error" });
};

// error controllers:

exports.handleInvalidPath = (req, res, next) => {
    res.status(404).send({ msg: "oopsie, path not found" });
};

exports.handle405s = (req, res, next) => {
    res.status(405).send({ msg: "nah pal, method not allowed" });
};