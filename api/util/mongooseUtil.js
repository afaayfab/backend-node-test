"use strict";

let mongoose = require('mongoose');
var logger = require('./logger');
var chalk = require('chalk');

exports.mananageConnection = function manageConnection(config) {
  mongoose.connect(config.dbhost + config.database, { useMongoClient: true }, function (err, res) {
    if (err) throw err;
    logger.info(chalk.blue("Connected to mongodb: " + config.database));
  });
}

exports.manageDBError = function manageDBError(err, res) {
  if (err) {
    var error = new Object();
    error.message = err.message;
    if (!error.code) {
      error.code = 500;
    } else {
      error.code = err.code;
    }

    res.status(error.code).jsonp(error);
  }

}