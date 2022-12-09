const authRouter = require('./auth.route');
const userRouter = require('./users.route');
const coursesRouter = require('./course.route');
const express = require('express');
const { sendErrorResponse } = require('../utils/sendResponse');
/**
 * Description of the app route.
 * @module APP-ROUTER
 * @param {object} app - The express application instance
 */
module.exports = (app) => {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use('/api/auth', authRouter);
  app.use('/api/user', userRouter);
  app.use('/api/course', coursesRouter);

  // app.all('*', (req, res) => sendErrorResponse(res, 404, 'Route does not exist'));
};
