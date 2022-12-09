'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('User_Courses', {
      type: 'foreign key',
      fields: ['user_id'],
      references: {
        table: 'Users',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }),
      await queryInterface.addConstraint('User_Courses', {
        type: 'foreign key',
        fields: ['course_id'],
        references: {
          table: 'Courses',
          field: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
  },
  down: async (queryInterface, Sequelize) => {},
};
