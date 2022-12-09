module.exports = function (sequelize, Model, DataTypes) {
  /**
   * User-Permissions Model Class.
   * @class User_Permissions @extend Model
   */
  class User_Permissions extends Model {}
  User_Permissions.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
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
    { sequelize, modelName: 'User_Permissions' }
  );

  return User_Permissions;
};
