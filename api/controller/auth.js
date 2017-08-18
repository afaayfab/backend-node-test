'use strict'

module.exports = function (logger) {
  let enviromentConfigLib = require('../util/environment')(logger)
  let apiUser = require('./api_user')(logger)
  let jwt = require('../util/jwt')(logger)
  var dbUtil = require('../util/mongooseUtil')(logger)
  var redisUtil = require('../util/redisUtil')(logger)
  return {
    authTokenLogin: (req, res) => {
      var config = enviromentConfigLib.managementConfig()
      var userReq = req.body.user
      if (userReq !== undefined) {
        userReq = userReq.toLowerCase()
        apiUser.findByElement('user', userReq.trim()).then(user => {
          if (user !== undefined && user !== null) {
            if (req.body.password !== undefined && req.body.password === user.password) {
              logger.info('User token creation: ' + JSON.stringify(user))
              var token = {token: jwt.createToken(user)}
              // var promiseRedisUtil = Promise.promisifyAll(redisUtil)
              var promesa = redisUtil.registerSession(token.token, user.user, config.expirationSession)
              promesa.then(() => {
                res.status(200).json(token)
              })
              console.log(promesa)
            } else {
              authenticationError(res)
            }
          } else {
            authenticationError(res)
          }
        }).catch(err => {
          dbUtil.manageDBError(err, res)
        })
      } else {
        var error = {}
        error.code = 500
        error.message = 'Body request empty'
        dbUtil.manageDBError(error, res)
      }
    }
  }
  function authenticationError (res) {
    var error = {}
    error.code = 401
    error.message = 'Authentication failed'
    dbUtil.manageDBError(error, res)
  }
}
