/**
 * Created by Dignal® for educational purposes. All rights reserved.
 */

'use strict'

require('dotenv').config()

module.exports = {
  'development': {
    'username': process.env.MYSQL_USER,
    'password': process.env.MYSQL_PASSWORD,
    'database': process.env.MYSQL_DATABASE,
    'host': process.env.MYSQL_HOST,
    'dialect': 'mysql',
    'timezone': 'America/Mexico_City',
    'logging': false,
    'dialectOptions': {
      'dateStrings': true,
      'typeCast': true,
      'timezone': 'local',
    },
  },
  'production': {
    'username': process.env.MYSQL_USER,
    'password': process.env.MYSQL_PASSWORD,
    'database': process.env.MYSQL_DATABASE,
    'host': process.env.MYSQL_HOST,
    'dialect': 'mysql',
    'timezone': 'America/Mexico_City',
    'logging': false,
    'dialectOptions': {
      'dateStrings': true,
      'typeCast': true,
      'timezone': 'local',
    },
  },
}
