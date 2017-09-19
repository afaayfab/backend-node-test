var amqp = require('amqplib')
var connection
exports.manageConnection = function manageConnection () {
  if (!connection) {
    connection = amqp.connect('amqp://localhost')
  }
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

exports.publishInQueue = function publishInQueue (conn, queueName) {
  let moment = require('moment')
  var msgHeaders = {
    lang: 'NodeJS',
    task: 'fake_celery.tasks.command',
    id: '9393-99393d-939-b',
    eta: moment(moment()).locale('es').format(),
    //   expires: 'undefined',
    //   group: 'undefined',
    retries: 0,
    //   timelimit: ['undefined', 'undefined'],
    root_id: '33kdf-393df-f30fs',
    //   parent_id: 'undefined',
    argsrepr: "('pruebas',)",
    kwargsrepr: '{}',
    origin: 'afaa'
  }

  var deliveryModeOption = 2
  var payload = '[["pruebas"], {}, {"callbacks": null, "errbacks": null, "chain": null, "chord": null}]'
  return conn.createChannel().then(ch => {
    ch.sendToQueue(queueName, Buffer.from(payload), {headers: msgHeaders, deliveryMode: deliveryModeOption, priority: 0, replyTo: 'me', correlationId: '33kdf-393df-f30fs', contentType: 'application/json', contentEncoding: 'utf-8'})
  })
}
