/**
 * Created by Dignal® for educational purposes. All rights reserved.
 */

'use strict'

const winston = require('winston')
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
  ],
})

const createErrorLog = (error) => {
  logger.error(`${new Date()} ${error.message}`)
}

const createInfoLog = (info) => {
  logger.info(`${new Date()} ${info}`)
}

const getRandomString = () => {
  const chain = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let string = ''
  for (let i = 0; 10 > i; i++) {
    string += chain[Math.floor(Math.random() * (chain.length - 1))]
  }
  return string
}

const isJson = (string) => {
  // '{hola: hola}' false true
  // 'hola true false
  return JSON.parse(string) && !!string
}

module.exports = {
  createErrorLog,
  createInfoLog,
  getRandomString,
  isJson,
}
