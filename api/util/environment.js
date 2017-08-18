
var config = require('../../config.js')

module.exports = function (logger) {
  return {
    managementConfig: function managementConfig () {
      var environment = process.env.NODE_ENV
      if (environment === undefined) {
        environment = 'debug'
      }
      var envConf
      if (environment === 'development') {
        logger.info('------------------INFO----------------------------')
        logger.info(config.dev)
        logger.info('----------------------------------------------')
        envConf = config.dev
      } else if (environment === 'production') {
        logger.info('------------------INFO----------------------------')
        logger.info(config.build)
        logger.info('----------------------------------------------')
        envConf = config.build
      } else {
      /* logger.info('------------------INFO----------------------------')
      logger.info(config.debug)
      logger.info('----------------------------------------------') */
        envConf = config.debug
        process.env.NODE_ENV = 'debug'
      }
      return envConf
    }
  }
}
