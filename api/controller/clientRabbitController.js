'use strict'
let publisher = require('../util/rabbit/publisher')
let receiver = require('../util/rabbit/receiver')
let when = require('when')
var publisherTaskCh

module.exports = function (io) {
  return {
    createExchangeUserTask: function () {
      return publisher.manageConnection().then(conn => {
        publisherTaskCh = publisher.createExchange(conn, 'task')
        return publisherTaskCh
      }).catch(err => {
        console.log(err)
      })
    },
    cleanPublisherTaskConnection: function () {
      console.log('cleaning conn')
      publisherTaskCh.then(ch => {
        ch.unbindQueue('clientQueueTask', 'task', '#').then((ok) => {
          return when.all([ch.deleteQueue('clientQueueTask')])
        }).catch(err => {
          console.log(err)
        })
      })
    },

    consumeUserTask: function () {
      return receiver.manageConnection().then(conn => {
        var options = {}
        options.conn = conn
        options.exchange = 'task'
        options.routingKey = '#'
        options.ioSocket = io
        options.ioSocketChannel = 'task'
        options.queueName = 'clientQueueTask'
        return receiver.manageExchange(options)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
