//@ts-check
const express = require('express');
const route = require('./src/routes');
const swaggerUI = require('swagger-ui-express');
const docs = require('./src/docs');
const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('./swagger.json');
const dotenv = require('dotenv');
dotenv.config();

/**
 * Database Intializer
 * @typedef {object} Database
 */
/**
 * @type {Database}
 */
const DBInitializer = require('./db/connection');

/**
 * Express configuration
 * @type {express.Application}
 */
const app = express();
/**
 * Environment Varibale
 * @type {string | number}
 */
const port = process.env.PORT || 3000;

/**
 * Description of the route.
 * @module test-route
 * @function
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @return {any}
 */
app.get('/', async (req, res, next) => {
  const db = await DBInitializer();
  res.json({ message: 'ok' });
});

route(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

// @ts-ignore
app.listen(port, '0.0.0.0', () => {
  console.log(`App listening at http://localhost:${port}`);
});
