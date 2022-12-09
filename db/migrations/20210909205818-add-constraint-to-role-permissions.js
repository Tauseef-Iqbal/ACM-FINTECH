'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('Role_Permissions', {
      type: 'foreign key',
      fields: ['role_id'],
      references: {
        table: 'Roles',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    }),
      await queryInterface.addConstraint('Role_Permissions', {
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
