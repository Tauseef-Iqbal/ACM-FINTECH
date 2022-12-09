const jwt = require('jsonwebtoken');
const DBInitializer = require('../../db/connection');
const { sendErrorResponse } = require('../utils/sendResponse');
const UserModel = require('../utils/users/users.model');

/**
 * Description of the app route.
 * @module AUTH-MIDDLEWARE
 * @function
 * @param {req} req - The coming request
 * @param {res} res - The response object to be sent
 * @param {next} next - Passing the control to next logic
 * @return {sendErrorResponse|next}
 */
module.exports = async (req, res, next) => {
  try {
    const db = await DBInitializer();
    const User = new UserModel(db.models.User);
    if (!req.headers.authorization) {
      return sendErrorResponse(res, 401, 'Authentication required');
    }
    const token =
      req.headers.authorization.split(' ')[1] || req.headers.authorization;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.getUser({ email: decoded.email });
      if (!user) {
        return sendErrorResponse(res, 401, 'Authentication Failed');
      }
      if (!user.isActive) {
        return sendErrorResponse(
          res,
          403,
          'Your account is either suspended or inactive. Contact admin to re-activate your account.'
        );
      }
      req.user = decoded;
    } catch (err) {
      return res.status(401).send('Invalid Token');
    }
    return next();
  } catch (e) {
    return sendErrorResponse(res, 401, 'Authentication Failed', e);
  }
};
