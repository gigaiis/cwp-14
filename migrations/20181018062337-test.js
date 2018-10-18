'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn(
		'films',
		'genres',
		Sequelize.STRING
	);
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn(
		'films',
		'genres'
    );
  }
};
