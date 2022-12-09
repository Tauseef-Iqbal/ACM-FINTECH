module.exports = function (sequelize, Model, DataTypes) {
  /**
   * Permission Model Class.
   * @class Permission @extend Model
   */
  class Permission extends Model {}
  Permission.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: 'Permission already exists',
        },
      },
    },
    {
      sequelize,
      modelName: 'Permission',
      timestamps: false,
    }
  );

  Permission.associate = (models) => {
    Permission.belongsToMany(models.Role, {
      through: 'Role_Permissions',
      as: 'roles',
      foreignKey: 'permission_id',
    });
  };

  return Permission;
};
