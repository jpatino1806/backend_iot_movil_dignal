/**
 * Created by Dignal® for educational purposes. All rights reserved.
 */

'use strict'

const { User } = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// https://www.npmjs.com/package/validatorjs
const validator = require('validatorjs')

const login = async (req, res) => {
  const rules = {
    username: 'required',
    password: 'required',
  }

  const validation = new validator(req.body, rules)

  if (true === validation.fails()) {
    return res.status(422).send(validation.errors)
  }

  const user = await User.findOne({
    where: {
      username: req.body.username,
      active: true,
    },
  })

  if (null === user) {
    return res.status(401).send({ message: 'Access denied.' })
  }

  const isRightPassword = bcrypt.compareSync(req.body.password, user.password)

  if (false === isRightPassword) {
    return res.status(401).send({ message: 'Access denied.' })
  }

  const token = jwt.sign({ user_id: user.id }, process.env.JWT_KEY_USERS)

  return res.status(200).send(
    {
      message: 'Access granted.',
      data: {
        user,
        token,
      },
    })
}

module.exports = { login }
