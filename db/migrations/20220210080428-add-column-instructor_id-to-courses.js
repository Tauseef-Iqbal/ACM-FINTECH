'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Courses',
      'instructor_id',
      Sequelize.INTEGER
    );
  },

  down: async (queryInterface, Sequelize) => {},
};
