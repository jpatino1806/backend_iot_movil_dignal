/**
 * Created by Dignal® for educational purposes. All rights reserved.
 */

'use strict'

const {
  Model,
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class DevicesData extends Model { }
  DevicesData.init({
    device_id: DataTypes.INTEGER,
    topic: DataTypes.STRING,
    data: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'DeviceData',
    tableName: 'devices_data',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  })
  return DevicesData
}
