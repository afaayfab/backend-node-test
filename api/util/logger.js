'use strict'

let winston = require('winston')
let path = require('path')
let moment = require('moment')
let config = require('../../config')
let fs = require('fs')
require('winston-daily-rotate-file')

// let Promise = require('bluebird')
let publisher = require('../../api/util/rabbit/publisher')

// module.exports = logger
let logger

module.exports = function () {
  return {
    initLoggerRabbit: function () {
      return publisher.manageConnection().then(conn => {
        return publisher.createExchange(conn, 'logs').then(channel => {
          return new Promise(
            function (resolve, reject) {
              let level
              let transports = []
              var configJson
              if (process.env.NODE_ENV === 'development') {
                level = config.dev.errorLevel
                configJson = config.dev
              } else if (process.env.NODE_ENV === 'production') {
                level = config.build.errorLevel
                configJson = config.build
              } else {
                level = config.debug.errorLevel
                configJson = config.debug
              }

              const logDirectory = path.join(configJson.filelog, '')
              fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

              transports.push(new winston.transports.DailyRotateFile({
                level: level,
                colorize: true,
                prettyPrint: true,
                filename: logDirectory,
                datePattern: 'yyyy-MM-dd.',
                prepend: true,
                json: true,
                align: true,
                humanReadableUnhandledException: true,
                timestamp: () => { return moment(moment()).locale('es').format('DD/MM/YYYY HH:mm:ss') }

              }))

              transports.push(new winston.transports.Console({
                level: level,
                colorize: true,
                prettyPrint: true,
                align: true,
                humanReadableUnhandledException: true,
                timestamp: () => { return moment(moment()).locale('es').format('DD/MM/YYYY HH:mm:ss') }
                // ,
                // handleExceptions: process.env.NODE_ENV === "production"
              }))

              logger = new winston.Logger({
                level: level,
                transports: transports,
                exitOnError: false,
                levels: {
                  'error': 0,
                  'warn': 1,
                  'info': 2,
                  'verbose': 3,
                  'debug': 4,
                  'silly': 5
                },
                colors: {
                  'error': '',
                  'warn': 'yellow',
                  'info': 'white',
                  'verbose': 'blue',
                  'debug': 'green',
                  'silly': 'orange'
                }
              })
              logger.on('logging', function (transport, level, msg, meta) {
                var logToSend = {}
                logToSend.timestamp = moment(moment()).locale('es').format('DD/MM/YYYY HH:mm:ss')
                logToSend.message = msg
                logToSend.level = level
                if (transport.name === 'console') {
                  publisher.publishInExchange(channel, 'logs', level, JSON.stringify(logToSend))
                }
              })
              resolve(channel)
            }
          )
        })
      })
    },
    getLogger: function () {
      return logger
    }
  }
}
