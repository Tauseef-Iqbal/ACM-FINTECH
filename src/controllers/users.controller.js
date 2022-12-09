const { Op } = require('sequelize');
const { hash } = require('../utils/hashing');
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require('../utils/sendResponse');
const DBInitializer = require('../../db/connection');
const UserModel = require('../services/users/users.model');

/**
 * Description of the auth module.
 * @module user-controller
 * @type {{users:Function}}
 * @type {{createUser:Function}}
 * @type {{getUserById:Function}}
 * @type {{getUserByEmail:Function}}
 * @type {{updateUser:Function}}
 * @type {{deleteUser:Function}}
 */
module.exports = {
  /**
   * Description of the users controller.
   * @function users
   * @param {req} req - The coming request
   * @param {res} res - The response object to be sent
   * @return {sendErrorResponse|sendSuccessResponse}
   */
  async users(req, res) {
    try {
      let db = await DBInitializer();
      const User = new UserModel(db.models.User);
      return sendSuccessResponse(
        res,
        201,
        await User.getUsers(),
        'All registered users'
      );
    } catch (e) {
      console.error(e);
      return sendErrorResponse(
        res,
        500,
        'Could not perform operation at this time, kindly try again later.',
        e
      );
    }
  },

  /**
   * Description of the createUser controller.
   * @function createUser
   * @param {req} req - The coming request
   * @param {res} res - The response object to be sent
   * @return {sendErrorResponse|sendSuccessResponse}
   */
  async createUser(req, res) {
    try {
      let db = await DBInitializer();
      const User = new UserModel(db.models.User);
      const {
        email,
        password,
        firstName,
        lastName,
        username,
        phone,
        isActive,
      } = req.body;
      let where = {
        [Op.or]: [{ email }, { phone }],
      };
      let user = await User.getUser(where);
      if (user && user.length) {
        return sendErrorResponse(
          res,
          422,
          'User with that email or phone already exists'
        );
      }
      const settings = {
        notification: {
          push: true,
          email: true,
        },
      };
      let newUser = await User.createUser({
        firstName,
        lastName,
        username,
        email,
        phone,
        password: hash(password),
        settings,
        isActive,
      });
      return sendSuccessResponse(
        res,
        201,
        newUser.dataValues,
        'User Created Successfully!'
      );
    } catch (e) {
      console.error(e);
      return sendErrorResponse(
        res,
        500,
        'Could not perform operation at this time, kindly try again later.',
        e
      );
    }
  },

  /**
   * Description of the getUserById controller.
   * @function getUserById
   * @param {req} req - The coming request
   * @param {res} res - The response object to be sent
   * @return {sendErrorResponse|sendSuccessResponse}
   */
  async getUserById(req, res) {
    try {
      let db = await DBInitializer();
      const User = new UserModel(db.models.User);
      return sendSuccessResponse(
        res,
        201,
        await User.getUserById(req.params.id),
        'A User data'
      );
    } catch (e) {
      console.error(e);
      return sendErrorResponse(
        res,
        500,
        'Could not perform operation at this time, kindly try again later.',
        e
      );
    }
  },

  /**
   * Description of the getUserByEmail controller.
   * @function getUserByEmail
   * @param {req} req - The coming request
   * @param {res} res - The response object to be sent
   * @return {sendErrorResponse|sendSuccessResponse}
   */
  async getUserByEmail(req, res) {
    try {
      let db = await DBInitializer();
      const User = new UserModel(db.models.User);
      return sendSuccessResponse(
        res,
        201,
        await User.getUser({ email: req.params.email }),
        'A User data'
      );
    } catch (e) {
      console.error(e);
      return sendErrorResponse(
        res,
        500,
        'Could not perform operation at this time, kindly try again later.',
        e
      );
    }
  },

  /**
   * Description of the updateUser controller.
   * @function updateUser
   * @param {req} req - The coming request
   * @param {res} res - The response object to be sent
   * @return {sendErrorResponse|sendSuccessResponse}
   */
  async updateUser(req, res) {
    try {
      let db = await DBInitializer();
      const User = new UserModel(db.models.User);
      const {
        email,
        password,
        firstName,
        lastName,
        username,
        phone,
        isActive,
        settings,
      } = req.body;
      let where = {
        [Op.or]: [{ email }, { phone }],
      };
      let user = await User.getUser(where);
      if (!user) {
        return sendErrorResponse(
          res,
          422,
          'User with that email or phone does not exist'
        );
      }
      const toBeUpdated = {
        firstName,
        lastName,
        username,
        phone,
        password: hash(password),
        settings,
        isActive,
      };
      const updatedUser = await User.updateUser(toBeUpdated, {
        [Op.or]: [{ email }, { phone }],
      });
      return sendSuccessResponse(
        res,
        201,
        updatedUser[1],
        'User Updated Successfully!'
      );
    } catch (e) {
      console.error(e);
      return sendErrorResponse(
        res,
        500,
        'Could not perform operation at this time, kindly try again later.',
        e
      );
    }
  },

  /**
   * Description of the deleteUser controller.
   * @function deleteUser
   * @param {req} req - The coming request
   * @param {res} res - The response object to be sent
   * @return {sendErrorResponse|sendSuccessResponse}
   */
  async deleteUser(req, res) {
    try {
      let db = await DBInitializer();
      const User = new UserModel(db.models.User);
      const existedUser = await User.getUserById(req.params.id);
      if (!existedUser) {
        return sendErrorResponse(res, 422, 'User does not exist');
      }
      const deletedUser = await existedUser.destroy();
      return sendSuccessResponse(
        res,
        201,
        deletedUser,
        `User with ID: ${existedUser.id} Deleted Successfully`
      );
    } catch (e) {
      console.error(e);
      return sendErrorResponse(
        res,
        500,
        'Could not perform operation at this time, kindly try again later.',
        e
      );
    }
  },
};
