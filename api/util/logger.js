'use strict'

let winston = require('winston')
let path = require('path')
let moment = require('moment')
let config = require('../../config')
require('winston-daily-rotate-file')
var publisher = require('../../api/util/rabbit/publisher')

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
publisher.managePublisher(configJson, 'logs')

const logDirectory = path.join(configJson.filelog, '')

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
  timestamp: () => { return moment(moment()).locale('es').format('DD/MM/YYYY HH:MM:ss') }

}))

transports.push(new winston.transports.Console({
  level: level,
  colorize: true,
  prettyPrint: true,
  align: true,
  humanReadableUnhandledException: true,
  timestamp: () => { return moment(moment()).locale('es').format('DD/MM/YYYY HH:MM:ss') }
  // ,
  // handleExceptions: process.env.NODE_ENV === "production"
}))

let logger = new winston.Logger({
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
    'error': 'red',
    'warn': 'yellow',
    'info': 'white',
    'verbose': 'blue',
    'debug': 'green',
    'silly': 'orange'
  }
})

logger.on('logging', function (transport, level, msg, meta) {
  if (transport.name === 'console') {
    var msgJson = {}
    msgJson.message = msg
    msgJson.level = level
    msgJson.timestamp = moment(moment()).locale('es').format('DD/MM/YYYY HH:MM:ss')
    publisher.publishInExchange(level, msgJson)
  }

//  publisher.publishInExchange(logExchange, level, msg)
  // console.log(moment(moment()).locale('es').format('DD/MM/YYYY HH:MM:ss') + '->' + level + '->' + msg + '->meta' + meta)
})

module.exports = logger
