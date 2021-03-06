'use strict'

module.exports = function (logger, req, res, next) {
  let redisUtil = require('../util/redisUtil')(logger)
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token']
  if (token) {
    redisUtil.getSession(token).then(value => {
      console.log('Token session from redis: ' + value)
      if (value) {
        next()
      } else {
        res.status(401).json({
          code: 401,
          message: 'Token is expired'
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
