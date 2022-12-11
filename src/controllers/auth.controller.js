const DBInitializer = require('../../db/connection');
const { Op } = require('sequelize');
const UserModel = require('../services/users/users.model');
const RolesModel = require('../services/roles/roles.model');
const {
  sendErrorResponse,
  sendSuccessResponse,
} = require('../utils/sendResponse');
const { hash, hash_compare } = require('../utils/hashing');
const jwt = require('jsonwebtoken');
const constants = require('../utils/constants');

/**
 * Description of the auth module.
 * @module auth-controller
 * @type {{signUp:Function}}
 * @type {{login:Function}}
 */
module.exports = {
  /**
   * Description of the signup controller.
   * @function signUp
   * @param {req} req - The coming request
   * @param {res} res - The response object to be sent
   * @return {sendErrorResponse|sendSuccessResponse}
   */
  async signUp(req, res) {
    try {
      let db = await DBInitializer();
      const User = new UserModel(db.models.User);
      const Role = new RolesModel(db.models.Role);
      const {
        email,
        password,
        firstName,
        lastName,
        username,
        phone,
        settings = {
          notification: {
            push: true,
            email: true,
          },
        },
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
      let newUser = await User.createUser({
        firstName,
        lastName,
        username,
        email,
        phone,
        password: hash(password),
        settings,
      });
      const userRole = await Role.getRole({
        name: constants.ROLE_AUTHENTICATED,
      });
      await newUser.addRole(userRole);

      return sendSuccessResponse(
        res,
        201,
        newUser.dataValues,
        'Account created successfully'
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
   * Description of the login controller.
   * @function login
   * @param {req} req - The coming request
   * @param {res} res - The response object to be sent
   * @return {sendErrorResponse|sendSuccessResponse}
   */
  async login(req, res) {
    try {
      let db = await DBInitializer();
      const User = new UserModel(db.models.User);
      const Role = new RolesModel(db.models.Role);
      const { email, password } = req.body;

      if (!email || !password) {
        return sendErrorResponse(
          res,
          400,
          'Incorrect login credentials. Kindly check and try again'
        );
      }
      const attributes = {
        exclude: ['createdAt', 'updatedAt'],
      };
      const include = [
        {
          model: db.models.Role,
          as: 'roles',
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
          },
        },
      ];
      const user = await User.getUser({ email }, attributes, include);
      if (!user)
        return sendErrorResponse(
          res,
          404,
          'User does not exist with these credentials. Kindly check and try again'
        );
      const checkPassword = hash_compare(hash(password), user.password);
      if (!checkPassword) {
        return sendErrorResponse(
          res,
          400,
          'Incorrect login credentials. Kindly check and try again'
        );
      }

      if (!user.isActive) {
        return sendErrorResponse(
          res,
          401,
          'Your account has been suspended. Contact admin'
        );
      }

      const userRoles = await user.getRoles();
      if (!userRoles.length) {
        return sendErrorResponse(
          res,
          401,
          'User does not have any roles. Contact admin'
        );
      }

      const roleToValidate = userRoles.map((role) => role.name);
      console.log('><>>>>>>>', roleToValidate);

      if (roleToValidate.includes(constants.ROLE_SUSPENDED)) {
        return sendErrorResponse(
          res,
          500,
          'Your account has been suspended. Contact admin'
        );
      }
      const token = jwt.sign(
        { user_id: user.id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: '2h',
        }
      );

      user.dataValues.token = token;
      return sendSuccessResponse(
        res,
        200,
        {
          user: user.dataValues,
        },
        'Login successfully'
      );
    } catch (e) {
      console.error(e);
      return sendErrorResponse(
        res,
        500,
        'Server error, contact admin to resolve issue',
        e
      );
    }
  },
};
