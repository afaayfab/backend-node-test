module.exports = function (logger) {
  return {
    initUserMongo: function () {
      let Promise = require('bluebird')
      let mongoose = Promise.promisifyAll(require('mongoose'))
      var User = mongoose.model('User')
      User.findOneAsync({ user: 'admin' }).then(user => {
        if (user === undefined || user === null) {
          user = new User({
            name: 'Admin',
            surname: 'admin surname',
            user: 'admin',
            password: '1234'
          })
          user.saveAsync(function (user) {
          })
        } else {
          logger.info('User admin already exists')
        }
      }).catch(err => {
        logger.error('Error inserting user admin: ' + err)
      })
    }
  }
}
