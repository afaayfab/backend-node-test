'use strict'
let logger = require('../util/logger')
let redisUtil = require('../util/redisUtil')
module.exports = function (req, res, next) {
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token']
  if (token) {
    try {
      var redisToken = redisUtil.getSession(token)
      console.log('Token session from redis: ' + redisToken)
      if (redisToken) {
        next()
      } else {
        res.status(400).json({
          code: 400,
          message: 'Token expired'
        })
      }
    // handle token here
    } catch (err) {
      logger.info(err)
      accessDenied(res)
    }
  } else {
    accessDenied(res)
  }
}

function accessDenied (res) {
  res.status(401).json({
    code: 401,
    message: 'Access denied'
  })
}
