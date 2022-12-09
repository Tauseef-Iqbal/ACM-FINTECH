module.exports = function (sequelize, Model, DataTypes) {
  /**
   * Role_Permissions Model Class.
   * @class Role_Permissions @extend Model
   */
  class Role_Permissions extends Model {}
  Role_Permissions.init(
    {
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id',
        },
      },
      permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Permissions',
          key: 'id',
        },
      },
    },
    { sequelize, modelName: 'Role_Permissions' }
  );

  return Role_Permissions;
};
