let jwt = require('../util/jwt')
var dbUtil = require('../util/mongooseUtil')
/*
let logger = require('../util/logger')
var chalk = require('chalk') */
let Promise = require('bluebird')
let mongoose = Promise.promisifyAll(require('mongoose'))
var User = mongoose.model('User')

exports.authTokenLogin = function (req, res) {
  User.findOne({user: req.body.user.toLowerCase()}).then(user => {
    if (req.body.password === user.password) {
      res.status(200).send({token: jwt.createToken(user)})
    } else {
      var error = {}
      error.code = 401
      error.message = 'Authentication failed'
      dbUtil.manageDBError(error, res)
    }
  }).catch(err => {
    dbUtil.manageDBError(err, res)
  })
}
