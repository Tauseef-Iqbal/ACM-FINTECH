const express = require('express');
const Auth = require('../middlewares/Auth');
const can = require('../middlewares/canAccess');
const Constants = require('../utils/constants');
const UserController = require('../controllers/users.controller');
const { sendSuccessResponse } = require('../utils/sendResponse');

const router = express.Router();

router.get(
  '/users',
  Auth,
  can(Constants.PERMISSION_VIEW_ALL_USERS),
  UserController.users
);
router.get(
  '/get-user-by-email/:email',
  Auth,
  can(Constants.PERMISSION_VIEW_A_USER),
  UserController.getUserByEmail
);
router.get(
  '/get-user-by-id/:id',
  Auth,
  can(Constants.PERMISSION_VIEW_A_USER),
  UserController.getUserById
);
router.post(
  '/create-user',
  Auth,
  can(Constants.PERMISSION_ADD_A_USER),
  UserController.createUser
);
router.put(
  '/update-user',
  Auth,
  can(Constants.PERMISSION_UPDATE_A_USER),
  UserController.updateUser
);
router.delete(
  '/delete-user/:id',
  Auth,
  can(Constants.PERMISSION_DELETE_A_USER),
  UserController.deleteUser
);
router.get(
  '/dashboard',
  Auth,
  can(Constants.PERMISSION_VIEW_ADMIN_DASHBOARD),
  (req, res) => {
    return sendSuccessResponse(res, 200, '', 'Admin dashboard access allowed.');
  }
);

module.exports = router;
