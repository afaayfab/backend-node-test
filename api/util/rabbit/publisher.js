
let amqp = require('amqp')

var connection = amqp.createConnection({host: 'localhost'})
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
