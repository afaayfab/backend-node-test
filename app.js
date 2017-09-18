'use strict'
let logIO
var app
var http
var express
var io
var logApi = require('./api/util/logger')()
logApi.initLoggerRabbit()/* .then(channel => { logApi.initLog(channel) }) */
  .then(() => {
    express = require('express')
    app = express()
    http = require('http').Server(app)
    io = require('socket.io')(http)
    logIO = require('./log_viewer/viewer')
    logIO.initLoggerWebSocket(io)
    let rabbitController = require('./api/controller/rabbitService/clientRabbit')(io)
    rabbitController.createExchangeUserTask()
  }).then(() => {
    var logger = logApi.getLogger()
    // require Express and Socket.io    
    var chalk = require('chalk')
    var bodyParser = require('body-parser')
    var methodOverride = require('method-override')

    require('./config.js')
    let path = require('path')

    require('./api/model/user')
    let env = require('./api/util/environment')(logger)
    var mongoose = require('./api/util/mongooseUtil')(logger)
    var userController = require('./api/controller/api_user')(logger)
    let auth = require('./api/controller/auth')(logger)
    var redisUtil = require('./api/util/redisUtil')(logger)
    var jwtauth = require('./api/controller/middelware')
    let rabbitClient = require('./api/controller/rabbitClientController')(io, logger)
    let initMongoUser = require('./api/controller/initEnvironment/init')(logger)
    initMongoUser.initUserMongo()
    // require('winston-logs-display')(app, logger)

    // var receiver = require('./api/util/rabbit/receiver')
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

    // receiver.manageReceiver(configEnv)

    // publisher.managePublisher(configEnv)

    let router = express.Router()

    // Fin rutas
    app.all('/api/*', jwtauth)
    app.use(express.static(path.join(__dirname, '/static')))
    logIO.initLoggerWebSocket(io)
    // Rutas
    router.route('/api/user').get(userController.findAll).post(userController.add)
    router.route('/api/user/:id').get(userController.getById).post(userController.update).delete(userController.delete)
    router.route('/auth').post(auth.authTokenLogin)
    router.route('/api/subscribe/task').get(rabbitClient.subscribeExchangeQueue)
    router.route('/api/unsubscribe/task').get(rabbitClient.unsubscribeExchangeQueue)
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
  })
