'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('TodoTasks', 'status',
      {
        allowNull: false,
        defaultValue: 'todo',
        type: Sequelize.STRING
      },
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TodoTasks');
  }
};
