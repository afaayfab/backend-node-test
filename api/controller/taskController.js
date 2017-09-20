'use strict'

module.exports = function (logger, io) {
  var celery = require('./rabbitService/clientRabbitCeleryTask')(logger, io)
  return {
    launchTask: function (req, res) {
      celery.launchTask().then(() => { res.json({ code: 200, message: 'Task launched' }) })
    },
    consumeCommands: function (req, res) {
      celery.cosumeCommands().then(() => { res.json({ code: 200, message: 'Consumer added' }) })
    }
  }
}
