
var fs = require('fs')
var buf = new Buffer(4096)

exports.initLoggerWebSocket = function initLoggerWebSocket (io) {
  /* io.use(function (socket, next) {
    console.log('Connected!')
    
    var query = socket.handshake.query */

  io.sockets.on('connection', function (socket) {
    io.emit('initLog')
    fs.readFile('static/logs/' + '2017-08-16.api-rest-dev.log', 'utf8', function read (err, data) {
      if (err) {
        throw err
      }
      io.emit('initLog', data)
    })
  })

  fs.open('static/logs/' + '2017-08-16.api-rest-dev.log', 'r', function (err, fd) {
    if (err) {
      throw err
    }
    fs.watchFile('static/logs/' + '2017-08-16.api-rest-dev.log', function (curr, prev) {
      var len = curr.size - prev.size
      var position = prev.size
      if (len > 0) {
        fs.read(fd, buf, 0, len, position,
          function (err, bytesRead, buffer) {
            if (err) {
              console.error(err)
              return
            }
            var msg = buffer.toString('utf8', 0, bytesRead)
            io.emit('logFile', msg)
          })
      }
    })
  })
}
