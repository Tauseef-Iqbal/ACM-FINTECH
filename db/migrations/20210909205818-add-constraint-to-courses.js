'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Courses', {
      type: 'foreign key',
      fields: ['instructor_id'],
      references: {
        table: 'Users',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },
  down: async (queryInterface, Sequelize) => {},
};
