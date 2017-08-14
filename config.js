module.exports = {
  build: {
    env: 'production',
    errorLevel: 'error',
    port: 8080,
    host: 'localhost',
    database: 'usersDb',
    dbhost: 'mongodb://localhost/',
    filelog: 'c:\\api-rest-log\\api-rest-pro.log',
    authToken: 'mytokensecret1234'
  },
  dev: {
    env: 'development',
    port: 3000,
    errorLevel: 'ok',
    host: 'localhost',
    database: 'usersDb',
    dbhost: 'mongodb://localhost/',
    filelog: 'c:\\api-rest-log\\api-rest-dev.log',
    authToken: 'mytokensecret1234'
  },
  debug: {
    env: 'debug',
    port: 8080,
    errorLevel: 'ok',
    host: 'localhost',
    database: 'usersDb',
    dbhost: 'mongodb://localhost/',
    filelog: 'c:\\api-rest-log\\api-rest-debug.log',
    authToken: 'mytokensecret1234'
  }
}
