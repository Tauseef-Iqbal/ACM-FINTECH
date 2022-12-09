module.exports = function (sequelize, Model, DataTypes) {
  /**
   * Role Model Class.
   * @class Role @extend Model
   */
  class Role extends Model {}
  Role.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Role already exists',
        },
      },
    },
    {
      sequelize,
      modelName: 'Role',
      timestamps: false,
    }
  );

  Role.associate = (models) => {
    Role.belongsToMany(models.User, {
      through: 'User_Roles',
      as: 'users',
      foreignKey: 'role_id',
    });
    Role.belongsToMany(models.Permission, {
      through: 'User_Permissions',
      as: 'permissions',
      foreignKey: 'role_id',
    });
  };

  return Role;
};
