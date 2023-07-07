/**
 * Created by Dignal® for educational purposes. All rights reserved.
 */

'use strict'
const {
  Model,
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class devices extends Model { }
  devices.init({
    user_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    key: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Device',
    tableName: 'devices',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  })
  return devices
}
