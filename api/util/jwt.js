'use strict'

module.exports = function (logger) {
  var jwtSimle = require('jwt-simple')
  var moment = require('moment')
  var config = require('../../config')
  let enviromentConfigLib = require('./environment')(logger)
  let enviromentConfig = enviromentConfigLib.managementConfig()
  return {
    ensureAuthenticated: function (req, res, next) {
      if (!req.headers.authorization) {
        return res
          .status(403)
          .send({message: 'No authentication header detected'})
      }
      var token = req.headers.authorization.split(' ')[1]
      var payload = jwtSimle.decode(token, config.TOKEN_SECRET)

      if (payload.exp <= moment().unix()) {
        return res.status(401)
          .send({message: 'token expired'})
      }

      req.user = payload.sub
      next()
    },
    createToken: function (user) {
      var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
      }
      return jwtSimle.encode(payload, enviromentConfig.authToken)
    }
  }
}
