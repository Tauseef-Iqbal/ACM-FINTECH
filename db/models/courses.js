module.exports = function (sequelize, Model, DataTypes) {
  /**
   * Course Model Class.
   * @class Course @extend Model
   */
  class Course extends Model {}
  Course.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
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
      instructor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
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
