'use strict'

let winston = require('winston')
let path = require('path')
let fs = require('fs')
let config = require('../../config')
require('winston-daily-rotate-file')
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
  timestamp: true

}))

transports.push(new winston.transports.Console({
  level: level,
  colorize: true,
  prettyPrint: true,
  align: true,
  humanReadableUnhandledException: true,
  timestamp: true
  // ,
  // handleExceptions: process.env.NODE_ENV === "production"
}))

let logger = new winston.Logger({
  level: level,
  transports: transports,
  exitOnError: false,
  levels: {
    'info': 0,
    'ok': 1,
    'error': 2
  },
  colors: {
    'info': 'yellow',
    'ok': 'green',
    'error': 'red'
  }
})

module.exports = logger
