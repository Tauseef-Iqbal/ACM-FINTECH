'use strict';
const Constants = require('../../src/utils/constants');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Roles',
      [
        { name: Constants.ROLE_SUPER_ADMIN },
        { name: Constants.ROLE_ADMIN },
        { name: Constants.ROLE_MODERATOR },
        { name: Constants.ROLE_AUTHENTICATED },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
