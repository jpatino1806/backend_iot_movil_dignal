/**
 * Created by Dignal® for educational purposes. All rights reserved.
 */

'use strict'

const passport = require('passport')
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt')
const db = require('../models')
const User = db.User

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY_USERS,
}, async (payload, done) => {
  try {
    const user = await User.findByPk(payload.user_id)
    if (null === user || false === user.active) {
      return done(null, false)
    }

    done(null, user)
  } catch (error) {
    done(error, false)
  }
}))
