/*
let Promise = require('bluebird')
let amqp = Promise.promisifyAll(require('amqp'))

var exchange
exports.createExchange = function createExchange (connection, exchangeName) {
  /// Create a connection to your RabbitMQ  
  return new Promise((resolve, reject) => {
    connection.exchange(exchangeName, {
      type: 'topic', /// This is the type of exchange I want to use
      confirm: false
    }, function (exh) {
      exchange = exh
      resolve(exh)
    })
  })

  // })
}

exports.manageConnection = function manageConnection () {
  return amqp.createConnection({ host: 'localhost' })
}

exports.publishInExchange = function publishInExchange (routintKey, message) {
  exchange.publish(routintKey, message, {
    durable: true
  })
}
*/

var amqp = require('amqplib')
exports.manageConnection = function manageConnection () {
  return amqp.connect('amqp://localhost')
}

exports.createExchange = function exchange (connection, exchange) {
  return connection.createChannel().then(ch => {
    ch.assertExchange(exchange, 'topic', {durable: true})
    return ch
  }).catch(err => {
    console.log('Error creating exchange: ' + err)
  })
}

exports.publishInExchange = function publishInExchange (ch, exchange, routingKey, msg) {
  ch.publish(exchange, routingKey, Buffer.from(msg))
}
// exports.pub
