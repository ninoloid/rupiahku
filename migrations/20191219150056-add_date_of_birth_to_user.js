'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Users', 'dateOfBirth', Sequelize.DATEONLY);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Users', 'dateOfBirth');
  }
};
