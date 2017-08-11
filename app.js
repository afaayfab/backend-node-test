// require Express and Socket.io
var express = require('express');
var chalk = require('chalk');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var config = require('./config.js');
var logger = require('./api/util/logger');
var models = require('./api/model/user');
var mongoose = require('./api/util/mongooseUtil');
var userController = require('./api/controller/api_user');
var environment = process.env.NODE_ENV;
var port;
var uri;
var config;
if (environment == 'development') {
  port = config.dev.port;
  uri = config.dev.host;
  logger.info('------------------INFO----------------------------');
  logger.info(config.dev);
  logger.info('----------------------------------------------');
  config = config.dev;
} else if (environment == 'production') {
  port = config.build.port;
  uri = config.build.host;
  logger.info('------------------INFO----------------------------');
  logger.info(config.build);
  logger.info('----------------------------------------------');
  config = config.build;
} else {
  port = config.debug.port;
  uri = config.debug.host;
  logger.info('------------------INFO----------------------------');
  logger.info(config.debug);
  logger.info('----------------------------------------------');
  config = config.debug;
  process.env.NODE_ENV = 'debug';
}
app.set('port', port);

// Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());

// Se coneocta a la base de datos de usuarios
mongoose.mananageConnection(config);

let router = express.Router();

// Rutas
router.route('/user').get(userController.findAll).post(userController.add);
router.route('/user/:id').get(userController.getById).post(userController.update).delete(userController.delete);

// Fin rutas

app.use('/api', router);

http.listen(app.get('port'), function() {
  logger.info('');
  logger.info('Application started!');
  logger.info('----------------------------------------------');
  logger.info('Environment:\t' + chalk.red(chalk.underline.bold(process.env.NODE_ENV)));
  logger.info('IP:\t\t' + uri);
  logger.info('Port:\t\t' + app.get('port'));
  logger.info('Database:\t\t');
  logger.info('');
  logger.info('----------------------------------------------');
});
module.exports = http;
