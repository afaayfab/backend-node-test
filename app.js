'use strict'
// require Express and Socket.io
var express = require('express')
var chalk = require('chalk')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var app = express()
var http = require('http').Server(app)
require('./config.js')
var logger = require('./api/util/logger')
require('./api/model/user')
let env = require('./api/util/environment')
var mongoose = require('./api/util/mongooseUtil')
var userController = require('./api/controller/api_user')
let auth = require('./api/controller/auth')
var redisUtil = require('./api/util/redisUtil')
var jwtauth = require('./api/controller/middelware')

var uri

let configEnv = env.managementConfig()

uri = configEnv.host
// Middlewares
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(methodOverride())
app.set('port', configEnv.port)
// Se coneocta a la base de datos de usuarios

mongoose.manageConnection(configEnv)
// Se conecta al redis
redisUtil.manageConnection(configEnv)

let router = express.Router()

// Fin rutas
app.all('/api/*', jwtauth)
// Rutas
router.route('/api/user').get(userController.findAll).post(userController.add)
router.route('/api/user/:id').get(userController.getById).post(userController.update).delete(userController.delete)
router.route('/auth').post(auth.authTokenLogin)
app.use(router)

http.listen(app.get('port'), function () {
  logger.info('')
  logger.info('Application started!')
  logger.info('----------------------------------------------')
  logger.info('Environment:\t' + chalk.red(chalk.underline.bold(process.env.NODE_ENV)))
  logger.info('IP:\t\t' + uri)
  logger.info('Port:\t\t' + app.get('port'))
  logger.info('Database:\t\t')
  logger.info('')
  logger.info('----------------------------------------------')
})
module.exports = http
