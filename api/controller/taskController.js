'use strict'

module.exports = function (logger) {
  var celery = require('./rabbitService/clientRabbitCeleryTask')(logger)
  return {
    launchTask: function () {
      celery.launchTask()
    }
  }
}
