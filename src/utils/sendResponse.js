/**
 * Error Response
 * @typedef {object} error-response
 * @property {object} req - The request object
 * @property {number} code - The error code
 * @property {string} errorMessage - The error message
 * @property {string} e: The error
 */

/**
 * send error response function
 * @function
 * @param {Object} req - Express request object
 * @param {number} code - status code
 * @param {string} errorMessage - error message to be sent
 * @param {string} e - Error
 * @return {error-response} response object
 */
const sendErrorResponse = (res, code, errorMessage, e = null) =>
  res.status(code).send({
    status: 'error',
    error: errorMessage,
    e: e?.toString(),
  });

/**
 * Success Response
 * @typedef {object} success-response
 * @property {object} res - The request object
 * @property {number} code - The success code
 * @property {any} e: The data to be sent
 * @property {string} message - The success message
 */

/**
 * send success response function
 * @function
 * @param {Object} req - Express request object
 * @param {number} code - status code
 * @param {Object} data - data to be delivered in response
 * @param {string} message - success message to be sent
 * @return {success-response} response object
 */
const sendSuccessResponse = (res, code, data, message = 'Successful') =>
  res.status(code).send({
    status: 'success',
    data,
    message,
  });

module.exports = {
  sendSuccessResponse,
  sendErrorResponse,
};
