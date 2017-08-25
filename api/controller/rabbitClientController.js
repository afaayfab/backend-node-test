'use strict'

module.exports = function (io, logger) {
  let client = require('./rabbitService/clientRabbit')(io)
  let publisher = require('../util/rabbit/publisher')
  return {
    subscribeExchangeQueue: function (req, res) {
      client.consumeUserTaskInsert().then(() => {
        return client.consumeUserTaskUpdate().then(() => {
          logger.debug('Subscribed to queue')
          res.status(200).json({ code: 200, message: 'Successfully suscribed' })
        })
      }).catch(err => {
        logger.err('There was an error subscribing to queue ' + err)
        res.status(500).json({ code: 500, message: 'Error subscribing' })
      })
    },
    unsubscribeExchangeQueue: function (req, res) {
      client.cleanPublisherTaskConnection().then(() => {
        logger.debug('unsuscribed  queue')
        res.status(200).json({ code: 200, message: 'Successfully unsuscribed' })
      }).catch(err => {
        logger.err('There was an error unsubscribing from queue ' + err)
        res.status(500).json({ code: 500, message: 'Error unsubscribing' })
      })
    },
    lauchBatteryTest: function (req, res) {
      var connection = publisher.getRabbitConnection()
      publisher.createExchange(connection, 'task')
      publisher.publishInExchange('task')
    }

  }
}
