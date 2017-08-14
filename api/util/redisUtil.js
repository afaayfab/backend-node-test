'use strict'

let logger = require('../util/logger')
let Promise = require('bluebird')
let redis = Promise.promisifyAll(require('redis'))
let chalk = require('chalk')
var client
exports.mananageConnection = function mananageConnection (configEnv) {
// Se conecta al redis
  logger.info('Connecting to redis')
  client = redis.createClient(configEnv.redisPort, configEnv.redisHost)
  client.on('connect', function () {
    logger.info('')
    logger.info(chalk.blue('Redis connected!'))
    logger.info('----------------------------------------------')
    logger.info('Host:\t' + configEnv.redisHost)
    logger.info('Port:\t\t' + configEnv.redisPort)
    logger.info('')
    logger.info('----------------------------------------------')
  })
}

exports.registerSession = function registerSession (token, expirationSession) {
  logger.info('-----Registering---------')
  logger.info('-----Redis key: ' + token.token)
  logger.info('-----Token: ' + token.token)
  client.setexAsync(token.token, expirationSession, token.token).then(reply => {
    logger.info('Token registered:' + reply)
  }).catch(err => {
    logger.error('Error registering toke:' + err)
    throw err
  })
}
