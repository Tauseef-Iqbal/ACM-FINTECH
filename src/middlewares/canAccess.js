const { sendErrorResponse } = require('../utils/sendResponse');
const RoleModel = require('../services/roles/roles.model');
const PermissionModel = require('../services/permissions/permissions.model');
const DBInitializer = require('../../db/connection');

/**
 * Description of the app route.
 * @module ACCESS-CONTROL-MIDDLEWARE
 * @param {string} permission
 * @function
 * @param {req} req - The coming request
 * @param {res} res - The response object to be sent
 * @param {next} next - Passing the control to next logic
 * @return {sendErrorResponse|next}
 */
module.exports = (permission) => async (req, res, next) => {
  let db = await DBInitializer();
  const Permission = new PermissionModel(db.models.Permission);
  // const Role = new RoleModel(db.models.Role);

  //logic here based on roles with permissions

  // const access = await Permission.getPermission({ name: permission });
  const permissions = await Permission.getPermissions();
  const allowed = permissions.map(({ name }) => name).includes(permission);
  if (allowed) {
    return next();
  }
  console.error('You do not have the authorization to access this.');
  return sendErrorResponse(
    res,
    403,
    'You do not have the authorization to access this'
  );
};
