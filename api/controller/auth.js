'use strict'
let jwt = require('../util/jwt')
var dbUtil = require('../util/mongooseUtil')
var redisUtil = require('../util/redisUtil')
let logger = require('../util/logger')
let Promise = require('bluebird')
let mongoose = Promise.promisifyAll(require('mongoose'))
var User = mongoose.model('User')
let enviromentConfigLib = require('../util/environment')

exports.authTokenLogin = function (req, res) {
  var config = enviromentConfigLib.managementConfig()
  var userReq = req.body.user
  if (userReq !== undefined) {
    userReq = userReq.toLowerCase()
    User.findOne({user: userReq}).then(user => {
      if (user !== undefined && user !== null) {
        if (req.body.password !== undefined && req.body.password === user.password) {
          logger.info('User token creation: ' + JSON.stringify(user))
          var token = {token: jwt.createToken(user)}
          redisUtil.registerSession(token, config.expirationSession)
          res.status(200).send(token)
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
