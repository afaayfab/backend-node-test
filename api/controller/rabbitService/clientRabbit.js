'use strict'
let publisher = require('../../util/rabbit/publisher')
let receiver = require('../../util/rabbit/receiver')
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
      return publisherTaskCh.then(ch => {
        ch.unbindQueue('clientQueueTask', 'task', 'insert').then(() => {
          ch.unbindQueue('clientQueueTaskUpdate', 'task', 'update')
        }).then(() => {
          return when.all([ch.deleteQueue('clientQueueTask'), ch.deleteQueue('clientQueueTaskUpdate')])
        }).catch(err => {
          console.log(err)
        })
      })
    },
    consumeUserTaskInsert: function () {
      return receiver.manageConnection().then(conn => {
        var options = {}
        options.conn = conn
        options.exchange = 'task'
        options.routingKey = 'insert'
        options.ioSocket = io
        options.ioSocketChannel = 'task'
        options.queueName = 'clientQueueTask'
        return receiver.manageExchange(options)
      }).catch(err => {
        console.log(err)
      })
    },
    consumeUserTaskUpdate: function () {
      return receiver.manageConnection().then(conn => {
        var options = {}
        options.conn = conn
        options.exchange = 'task'
        options.routingKey = 'update'
        options.ioSocket = io
        options.ioSocketChannel = 'updateTask'
        options.queueName = 'clientQueueTaskUpdate'
        return receiver.manageExchange(options)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
