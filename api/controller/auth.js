'use strict'
let jwt = require('../util/jwt')
var dbUtil = require('../util/mongooseUtil')
var redisUtil = require('../util/redisUtil')
let logger = require('../util/logger')
let apiUser = require('./api_user')
let enviromentConfigLib = require('../util/environment')

exports.authTokenLogin = function (req, res) {
  var config = enviromentConfigLib.managementConfig()
  var userReq = req.body.user
  if (userReq !== undefined) {
    userReq = userReq.toLowerCase()
    apiUser.findByElement('user', userReq).then(user => {
      if (user !== undefined && user !== null) {
        if (req.body.password !== undefined && req.body.password === user.password) {
          logger.info('User token creation: ' + JSON.stringify(user))
          var token = {token: jwt.createToken(user)}
          redisUtil.registerSession(token.token, user.user, config.expirationSession).then(()=>{
            res.status(200).send(token)
          })
          
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

function authenticationError (res) {
  var error = {}
  error.code = 401
  error.message = 'Authentication failed'
  dbUtil.manageDBError(error, res)
}
