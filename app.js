const express = require('express');
const app = express();
const apiRouter = require('./routes/api.router');
const { handleInvalidPath, handle500s } = require('./errors');

app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', handleInvalidPath);

app.use(handle500s)

module.exports = app;