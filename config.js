module.exports = {
  build: {
    env: 'production',
    errorLevel: 'error',
    port: 8080,
    host: 'localhost',
    database: 'usersDb',
    dbhost: 'mongodb://localhost/',
    filelog: 'static/logs/api-rest-pro.log',
    authToken: 'mytokensecret1234',
    redisHost: 'localhost',
    redisPort: '6379',
    expirationSession: 1800
  },
  dev: {
    env: 'development',
    port: 3000,
    errorLevel: 'ok',
    host: 'localhost',
    database: 'usersDb',
    dbhost: 'mongodb://localhost/',
    filelog: 'static/logs/api-rest-dev.log',
    authToken: 'mytokensecret1234',
    redisHost: 'localhost',
    redisPort: '6379',
    expirationSession: 864000000
  },
  debug: {
    env: 'debug',
    port: 8080,
    errorLevel: 'ok',
    host: 'localhost',
    database: 'usersDb',
    dbhost: 'mongodb://localhost/',
    filelog: 'static/logs/api-rest-debug.log',
    authToken: 'mytokensecret1234',
    redisHost: 'localhost',
    redisPort: '6379',
    expirationSession: 864000000

  }
}
