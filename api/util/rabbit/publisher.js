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
