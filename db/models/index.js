const UserInitiater = require('./users');
const RoleInitiater = require('./roles');
const PermissionInitiater = require('./permissions');
const CourseInitiater = require('./courses');
const UserRolesInitiater = require('./user-roles');
const UserCoursesInitiater = require('./user-courses');
const RolePermissionsInitiater = require('./role-permissions');

module.exports = async function (sequelize, Model, DataTypes) {
  return {
    User: UserInitiater(sequelize, Model, DataTypes),
    Role: RoleInitiater(sequelize, Model, DataTypes),
    Permission: PermissionInitiater(sequelize, Model, DataTypes),
    Course: CourseInitiater(sequelize, Model, DataTypes),
    UserRoles: UserRolesInitiater(sequelize, Model, DataTypes),
    UserCourses: UserCoursesInitiater(sequelize, Model, DataTypes),
    RolePermissions: RolePermissionsInitiater(sequelize, Model, DataTypes),
  };
};
