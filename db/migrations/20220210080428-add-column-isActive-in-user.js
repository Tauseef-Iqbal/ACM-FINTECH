'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'isActive', Sequelize.BOOLEAN);
  },

  down: async (queryInterface, Sequelize) => {},
};
