/**
 * Created by Dignal® for educational purposes. All rights reserved.
 */

'use strict'
const bcrypt = require('bcrypt')
const { User } = require('../../models')
const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = {
  up: async (queryInterface) => {
    const rounds = 10
    const hash = bcrypt.hashSync('admin', rounds)

    await queryInterface.bulkInsert('users', [{
      name: 'Admin',
      username: 'admin',
      password: hash,
      created_at: new Date(),
      updated_at: new Date(),
    }], {})

    const user = await User.findByPk(1)

    const token = jwt.sign({
      user_id: user.id,
    }, process.env.JWT_KEY)

    user.token = token
    await user.save()
  },
}
