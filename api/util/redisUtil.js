'use strict'

let Promise = require('bluebird')
let redis = Promise.promisifyAll(require('redis'))
let chalk = require('chalk')
var client

module.exports = function (logger) {
  return {
    manageConnection: function manageConnection (configEnv) {
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
    },

    registerSession: function registerSession (token, user, expirationSession) {
      logger.info('-----Registering---------')
      logger.info('-----Redis key: ' + token)
      logger.info('-----Token: ' + token)
      return client.setexAsync(token.trim(), expirationSession, user).then(reply => {
        logger.info('Token registered:' + reply)
      }).catch(err => {
        logger.error('Error registering toke:' + err)
        throw err
      })
    },

    getSession: function getSession (token) {
      logger.info('-----Getting user session---------')
      return client.getAsync(token.trim()).then(reply => {
        if (reply) {
          logger.info('The value of token: ' + token + ' is: ' + reply)
        } else {
          logger.info('Token not found!')
        }
        return reply
      })
    }

  }
}
