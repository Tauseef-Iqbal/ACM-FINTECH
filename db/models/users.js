const PROTECTED_ATTRIBUTES = ['password'];

module.exports = function (sequelize, Model, DataTypes) {
  /**
   * User Model Class.
   * @class User @extend Model
   */
  class User extends Model {
    toJSON() {
      // hide protected fields
      const attributes = { ...this.get() };
      for (const a of PROTECTED_ATTRIBUTES) {
        delete attributes[a];
      }
      return attributes;
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
        set(value) {
          throw new Error('Do not try to set the `fullName` value!');
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          this.setDataValue(
            'email',
            typeof value === 'string' ? value.toLowerCase() : value
          );
        },
      },
      password: DataTypes.STRING,
      username: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue(
            'username',
            typeof value == 'string' ? value.toLowerCase() : null
          );
        },
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      settings: DataTypes.JSON,
      phone: {
        type: DataTypes.STRING,
      },
    },
    { sequelize, modelName: 'User' }
  );

  User.associate = (models) => {
    User.belongsToMany(models.Role, {
      through: 'User_Roles',
      as: 'roles',
      foreignKey: 'user_id',
    });
    User.belongsToMany(models.Course, {
      through: 'User_Courses',
      as: 'courses',
      foreignKey: 'user_id',
    });
  };

  return User;
};
