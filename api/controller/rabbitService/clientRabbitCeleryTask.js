'use strict'
let publisher = require('../../util/rabbit/publisher')
var publisherTaskCeleryCh
let receiver = require('../../util/rabbit/receiver')
module.exports = function (logger, io) {
  return {
    launchTask: function () {
      logger.info('Task executing')
      return publisher.manageConnection().then(conn => {
        publisherTaskCeleryCh = publisher.publishInQueue(conn, 'commands')
        return publisherTaskCeleryCh
      }).catch(err => {
        logger.error(err)
      })
    },
    cosumeCommands: function () {
      let uuid = require('uuid/v4')
      logger.info('consumeCommand initialized!')
      return receiver.manageConnection().then(conn => {
        var options = {}
        options.conn = conn
        options.exchange = 'celeryev'
        options.routingKey = 'task.#'
        options.ioSocket = io
        options.ioSocketChannel = 'celeryCommands'
        options.queueName = 'celeryEventsQueue-' + uuid()
        logger.info('json webSocket created: ' + options)
        return receiver.manageExchange(options)
      }).catch(err => {
        logger.log(err)
      })
    }
  }
}
