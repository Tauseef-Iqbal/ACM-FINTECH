'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('User_Roles', {
      type: 'foreign key',
      fields: ['user_id'],
      references: {
        table: 'Users',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }),
      await queryInterface.addConstraint('User_Roles', {
        type: 'foreign key',
        fields: ['role_id'],
        references: {
          table: 'Roles',
          field: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
  },
  down: async (queryInterface, Sequelize) => {},
};
