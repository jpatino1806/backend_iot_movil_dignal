/**
 * Created by Dignal® for educational purposes. All rights reserved.
 */

'use strict'
const {
  Model,
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toJSON() {
      const attributes = Object.assign({}, this.get())
      delete attributes.password
      return attributes
    }
  }
  User.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    token: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  })
  return User
}
