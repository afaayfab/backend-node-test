'use strict'
let publisher = require('../../util/rabbit/publisher')
var publisherTaskCeleryCh

module.exports = function (logger) {
  return {
    launchTask: function () {
      logger.info('Se ejecuta el launch task')
      return publisher.manageConnection().then(conn => {
        publisherTaskCeleryCh = publisher.publishInQueue(conn, 'commands')
        return publisherTaskCeleryCh
      }).catch(err => {
        logger.error(err)
      })
    }
  }
}
