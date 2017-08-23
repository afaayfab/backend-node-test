var amqp = require('amqplib')
var when = require('when')
var connection
exports.manageConnection = function manageConnection () {
  if (!connection) {
    connection = amqp.connect('amqp://localhost')
  }
  return connection
}

exports.manageExchange = function manageExchange (options) {
  return options.conn.createChannel().then((ch) => {
    return when.all([
      ch.assertQueue(options.queueName),
      ch.assertExchange(options.exchange, 'topic', {durable: true}),
      ch.bindQueue(options.queueName, options.exchange, options.routingKey),
      ch.consume(options.queueName, function (msg) {
        if (msg) {
          if (options.ioSocket) {
            if (options.ioSocket === 'task') {
              console.log()
            }
            options.ioSocket.emit(options.ioSocketChannel, msg.content.toString())
          }
          console.log(options.queueName + "->Consumer-> [x] %s: '%s'", msg.fields.routingKey, msg.content.toString())
        }
      }).catch(err => {
        console.log(err)
      })
    ])
  })
}

exports.deleteQueue = function deleteQueue (queue) {

}
