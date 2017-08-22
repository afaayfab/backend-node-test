var receiver = require('../api/util/rabbit/receiver')
exports.initLoggerWebSocket = function initLoggerWebSocket (io) {
  io.sockets.on('connection', function (socket) {
    io.emit('initLog')
  })

  var conn = receiver.manageConnection()
  conn.then(conn => {
    receiver.manageExchange(conn, 'logs', '#', io)
  })
}
