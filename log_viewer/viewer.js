var receiver = require('../api/util/rabbit/receiver')
exports.initLoggerWebSocket = function initLoggerWebSocket (io) {
  io.sockets.on('connection', function (socket) {
    io.emit('initLog')
  })

  var conn = receiver.manageConnection()
  conn.then(conn => {
    var options = {}
    options.conn = conn
    options.exchange = 'logs'
    options.routingKey = '#'
    options.ioSocket = io
    options.ioSocketChannel = 'logFile'
    options.queueName = 'clientQueue'
    receiver.manageExchange(options)
  })
}
