var amqp = require('amqplib')
var connection
exports.manageConnection = function manageConnection () {
  connection = amqp.connect('amqp://localhost')
  return connection
}

exports.getRabbitConnection = function getRabbitConnection () {
  return connection
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
