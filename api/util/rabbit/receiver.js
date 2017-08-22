var amqp = require('amqplib')
var when = require('when')

exports.manageConnection = function manageConnection () {
  return amqp.connect('amqp://localhost')
}

exports.manageExchange = function manageExchange (options) {
  options.conn.createChannel().then((ch) => {
    return when.all([
      ch.assertQueue(options.queueName),
      ch.assertExchange(options.exchange, 'topic', {durable: true}),
      ch.bindQueue(options.queueName, options.exchange, options.routingKey),
      ch.consume(options.queueName, function (msg) {
        options.ioSocket.emit(options.ioSocketChannel, msg.content.toString())
        console.log(" [x] %s: '%s'", msg.fields.routingKey, msg.content.toString())
      })
    ])
  })
}
