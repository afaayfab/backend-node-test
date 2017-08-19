'use strict'
let amqp = require('amqp')

var connection = amqp.createConnection({
  host: 'localhost',
  port: 5672,
  login: 'guest',
  password: 'guest',
  connectionTimeout: 10000,
  authMechanism: 'AMQPLAIN',
  vhost: '/',
  noDelay: true,
  ssl: { enabled: false
  }
})
var exchange
exports.managePublisher = function managePublisher (configEnv, exchangeName) {
  /// Create a connection to your RabbitMQ  
  connection.on('ready', function () {
    connection.exchange(exchangeName, {
      type: 'topic', /// This is the type of exchange I want to use
      confirm: false
    }, function (exh) {
      exchange = exh
    })
  })
}

exports.publishInExchange = function publishInExchange (routintKey, message) {
  if (exchange !== undefined) {
    exchange.publish(routintKey, message, {
      durable: true
    })
  }
}
