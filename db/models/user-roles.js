module.exports = function (sequelize, Model, DataTypes) {
  /**
   * User Model Class.
   * @class User_Roles @extend Model
   */
  class User_Roles extends Model {}
  User_Roles.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Roles',
          key: 'id',
        },
      },
    },
    { sequelize, modelName: 'User_Roles' }
  );

  return User_Roles;
};
