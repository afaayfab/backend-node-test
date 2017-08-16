'use strict'
let logger = require('../util/logger')

let redisUtil = require('../util/redisUtil')

module.exports = function (req, res, next) {
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token']
  if (token) {
    redisUtil.getSession(token).then(value => {
      console.log('Token session from redis: ' + value)
      if (value) {
        next()
      } else {
        res.status(401).json({
          code: 401,
          message: 'Token is epired'
        })
      }
    }).catch(err => {
      logger.info(err)
      accessDenied(res)
    })
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
