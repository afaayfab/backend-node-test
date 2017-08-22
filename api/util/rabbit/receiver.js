var amqp = require('amqplib')
var when = require('when')

exports.manageConnection = function manageConnection () {
  return amqp.connect('amqp://localhost')
}

exports.manageExchange = function manageExchange (connection, exchange, routingKeys, io) {
  connection.createChannel().then((ch) => {
    return when.all([
      ch.assertQueue(''),
      ch.assertExchange(exchange, 'topic', {durable: true}),
      ch.bindQueue('', exchange, routingKeys),
      ch.consume('', function (msg) {
        io.emit('logFile', msg.content.toString())
        console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString())
      })
    ])
  })
}
