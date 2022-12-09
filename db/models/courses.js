module.exports = function (sequelize, Model, DataTypes) {
  /**
   * Course Model Class.
   * @class Course @extend Model
   */
  class Course extends Model {}
  Course.init(
    {
      name: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue(
            'name',
            typeof value == 'string' ? value.toLowerCase() : null
          );
        },
      },
      isCompleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { sequelize, modelName: 'Course' }
  );

  Course.associate = (models) => {
    Course.belongsToMany(models.User, {
      through: 'User_Courses',
      as: 'users',
      foreignKey: 'course_id',
    });
  };

  return Course;
};
