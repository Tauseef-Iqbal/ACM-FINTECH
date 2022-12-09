'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('User_Permissions', {
      type: 'foreign key',
      fields: ['user_id'],
      references: {
        table: 'Users',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }),
      await queryInterface.addConstraint('User_Permissions', {
        type: 'foreign key',
        fields: ['permission_id'],
        references: {
          table: 'Permissions',
          field: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      });
  },
  down: async (queryInterface, Sequelize) => {},
};
