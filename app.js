const express = require('express');
const app = express();
const apiRouter = require('./routes/api.router');
// const { handleInvalidPath, handleServerErrors, handleCustomErrors } = require('./errors');
const { handleInvalidPath, handleServerErrors, handlePsqlErrors, handleCustomErrors } = require('./errors');

//essential in order to use the req.body and req.params in the controllers
app.use(express.json());

// send to be used in apiRouter
app.use('/api', apiRouter);

// to be used in errors.js
app.all('/*', handleInvalidPath);
app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);
module.exports = app;