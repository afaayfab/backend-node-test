var amqp = require('amqp')

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

// TODO: prueba
exports.connectClientLog = function connectClientLog (io) {
// add this for better debuging
  connection.on('error', function (e) {
    console.log('Error from amqp: ', e)
  })

  // Wait for connection to become established.
  connection.on('ready', function () {
    // Use the default 'amq.topic' exchange
    connection.queue('user-queue', function (q) {
      // Catch all messages
      q.bind('logs', 'info')

      // Receive messages
      q.subscribe(function (message) {
        // Print messages to stdout
        io.emit('logFile', message.data.toString())
        console.log(message)
      })
    })
  })
}
