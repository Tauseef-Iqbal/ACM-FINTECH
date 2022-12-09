module.exports = function (sequelize, Model, DataTypes) {
  /**
   * User_Courses Model Class.
   * @class User_Courses @extend Model
   */
  class User_Courses extends Model {}
  User_Courses.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Courses',
          key: 'id',
        },
      },
    },
    { sequelize, modelName: 'User_Courses' }
  );

  return User_Courses;
};
