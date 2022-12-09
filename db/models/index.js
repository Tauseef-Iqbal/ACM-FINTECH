const RoleInitiater = require('./roles');
const UserInitiater = require('./users');
const CourseInitiater = require('./courses');
const PermissionInitiater = require('./permissions');
const UserRolesInitiater = require('./user-roles');
const RolePermissionsInitiater = require('./role-permissions');
const UserPermissionsInitiater = require('./user-permissions');
const UserCoursesInitiater = require('./user-courses');

module.exports = async function (sequelize, Model, DataTypes) {
  return {
    Role: RoleInitiater(sequelize, Model, DataTypes),
    User: UserInitiater(sequelize, Model, DataTypes),
    Course: CourseInitiater(sequelize, Model, DataTypes),
    Permission: PermissionInitiater(sequelize, Model, DataTypes),
    UserRoles: UserRolesInitiater(sequelize, Model, DataTypes),
    RolePermissions: RolePermissionsInitiater(sequelize, Model, DataTypes),
    UserCourses: UserCoursesInitiater(sequelize, Model, DataTypes),
    UserPermissions: UserPermissionsInitiater(sequelize, Model, DataTypes),
  };
};
