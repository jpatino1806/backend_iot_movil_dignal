/**
 * Created by Dignal® for educational purposes. All rights reserved.
 */

'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('devices_data', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      device_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'devices',
          },
          key: 'id',
        },
      },
      topic: {
        type: Sequelize.STRING,
      },
      data: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('devices_data')
  },
}
