/**
 * Created by Dignal® for educational purposes. All rights reserved.
 */

'use strict'

const validator = require('validatorjs')
const { Device } = require('../models')
validator.useLang('es')

const index = async (req, res) => {
  const devices = await Device.findAll({ where: { user_id: req.user.id } })
  return res.status(200).send({ data: devices })
}

const create = async (req, res) => {
  try {
    const rules = { name: 'required' }

    const validation = new validator(req.body, rules)
    validation.setAttributeNames({ name: 'nombre' })

    if (true === validation.fails()) {
      return res.status(422).send(validation.errors)
    }

    await Device.create({
      name: req.body.name,
      key: functions.getRandomString(),
      user_id: req.user.id,
    })

    return res.status(201).send({ message: 'Device created.' })

  } catch (err) {
    console.log(err)
    functions.createErrorLog(err)
    return res.status(500).send({ data: [], message: null })
  }
}

const update = async (req, res) => {
  try {

    if ('undefined' === typeof req.body.active) {
      const rules = { name: 'required' }

      const validation = new validator(req.body, rules)
      validation.setAttributeNames({ name: 'nombre' })

      if (true === validation.fails()) {
        return res.status(422).send(validation.errors)
      }
    }

    const device = await Device.findByPk(req.params.id)
    await device.update(req.body)

    return res.status(200).send({ message: 'Device updated.' })

  } catch (err) {
    console.log(err)
    functions.createErrorLog(err)
    return res.status(500).send({ data: [], message: null })
  }
}

module.exports = {
  index,
  create,
  update,
}
