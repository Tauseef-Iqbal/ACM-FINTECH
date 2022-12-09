'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          firstName: 'Tauseef',
          lastName: 'Iqbal',
          email: 'tauseefiqbal939@gmail.com',
          phone: '+923034002402',
          username: 'tauseefiqbal',
          password: 'ashlar',
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Ashlar',
          lastName: 'Global',
          email: 'tauseef@ashlarglobal.com',
          phone: '+923058427980',
          username: 'ashlarglobal',
          password: 'ashlarglobal',
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: 'Student_01',
          lastName: 'Roll01',
          email: 'Student_01@ashlarglobal.com',
          phone: '+923047062289',
          username: 'ashlarglobal',
          password: 'ashlarglobal',
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
