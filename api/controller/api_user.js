var mongoose = require('mongoose');
var User = mongoose.model('User');
var logger = require('../util/logger');
var chalk = require('chalk');
var dbUtil = require('../util/mongooseUtil');
/**
 * @apiDescription Delete an existing user by its Id
 * @api {DELETE} /user/:id Delete an user
 * @apiName update
 * @apiGroup User
 * @apiVersion  1.0.0
 * @apiExample {curl} Example usage:
 *    curl -X DELETE http://localhost:3000/api/user/598c0199c697124204abad36
 *
 * @apiParam {String} id Users unique ID.
 * @apiSuccessExample {json} Success-Response:
    {
    "code": 200,
    "message": "Successfully deleted"
    }
 * 
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal error
 * {
    "message": "User could not be deleted. Unexpected error.",
    "code": 500
  }
 * 
 */
exports.delete = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    user.remove(function (err) {
      dbUtil.manageDBError(err, res);
      res.json({ code:200, message: 'Successfully deleted' });
    });
  });
};




/**
 * @apiDescription Get all Users stored in database
 * @api {GET} /user Request User information
 * @apiName findAll
 * @apiGroup User 
 * @apiVersion  1.0.0
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost/user 
 * 
 * @apiSuccess (200) {String[]} users List of users
 * @apiSuccess (200) {String[]} users.name User's name
 * @apiSuccess (200) {String[]} users.surname User's surname
 * @apiSuccess (200) {String[]} users.user User's login
 * @apiSuccess (200) {String[]} users.password User's password
 * @apiSuccessExample {json} Success-Response:
    [{
        "_id": "598c0199c697124204abad36",
        "name": "Victor",
        "surname": "Dieguez",
        "user": "vdg",
        "password": "1234",
        "__v": 0
    },
    {
        "_id": "598c02a87f045b2c4886459b",
        "name": "Luis",
        "surname": "Casado",
        "user": "lcv",
        "password": "1234",
        "__v": 0
    }]
 * 
 * 
 */
exports.findAll = function (req, res) {
  User.find(function (err, users) {
    dbUtil.manageDBError(err, res);
    logger.ok(chalk.red('GET /user'));
    res.status(200).jsonp(users);
  });

};

/**
 * @apiDescription Add a new user to de database
 * @api {POST} /user Add a new user
 * @apiName add
 * @apiGroup User
 * @apiVersion  1.0.0
 * @apiExample {curl} Example usage:
 *    curl -H "Content-Type: application/json" -X POST -d '{"name":"Victor","surname":"Dieguez","user": "vdg","password": "1234"}' http://localhost:3000/api/user
 * 
 * @apiSuccess (200) {String[]} users.name User's name
 * @apiSuccess (200) {String[]} users.surname User's surname
 * @apiSuccess (200) {String[]} users.user User's login
 * @apiSuccess (200) {String[]} users.password User's password
 * @apiSuccessExample {json} Success-Response:
    {
        "_id": "598c0199c697124204abad36",
        "name": "Victor",
        "surname": "Dieguez",
        "user": "vdg",
        "password": "1234",
        "__v": 0
    }
 * 
 * 
 * @api {post} /user
 * @apiParam {String} name User's name
 * @apiParam {String} surname  User's surname
 * @apiParam {String} user User's login
 * @apiParam {String} password  User's password
 * @apiParamExample {json} Request-Example:
  {
    "name": "Victor",
    "surname": "Dieguez",
    "user": "vdg",
    "password": "1234"
  }   
 * 
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal error
 * {
    "message": "User validation failed: surname: Path `surname` is required.",
    "code": 500
  }
 * 
 */
exports.add = function (req, res) {
  logger.ok('POST /user');
  logger.ok(req.body);
  var user;
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    var err = new Object();
    err.message = 'The body request is empty';
    err.code = 500
    dbUtil.manageDBError(err, res);
  }
  try {
    user = new User({
      name: req.body.name,
      surname: req.body.surname,
      user: req.body.user,
      password: req.body.password
    });
  } catch (e) {
    logger.error("Error User json validation");
    var err = new Object();
    err.message = 'Error User json validation';
    err.code = 500
    dbUtil.manageDBError(err, res);
  }

  user.save(function (err, user) {
    dbUtil.manageDBError(err, res);
    res.status(200).jsonp(user);
  });
};



/**
 * @apiDescription Get an Users by Id
 * @api {GET} /user/:id Request User information by Id
 * @apiName getById
 * @apiGroup User 
 * @apiVersion  1.0.0
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost/user/598b0b050220e71c0c631753
 *  
 * @apiSuccess (200) {String[]} users.name User's name
 * @apiSuccess (200) {String[]} users.surname User's surname
 * @apiSuccess (200) {String[]} users.user User's login
 * @apiSuccess (200) {String[]} users.password User's password
 * @apiSuccessExample {json} Success-Response:
    {
        "_id": "598c0199c697124204abad36",
        "name": "Victor",
        "surname": "Dieguez",
        "user": "vdg",
        "password": "1234",
        "__v": 0
    }
 * 
 * 
 */
exports.getById = function (req, res) {
  var id = req.params.id;
  User.findById(id, function (err, user) {
    dbUtil.manageDBError(err, res);
    logger.ok(chalk.red('GET /user/' + id));
    logger.ok(user._doc);
    res.status(200).jsonp(user);
  });
};


/**
 * @apiDescription Update an existing user by its Id
 * @api {POST} /user/:id Update an user
 * @apiName update
 * @apiGroup User
 * @apiVersion  1.0.0
 * @apiExample {curl} Example usage:
 *    curl -H "Content-Type: application/json" -X POST -d '{"name":"Victor","surname":"Dieguez","user": "vdg","password": "1234"}' http://localhost:3000/api/user/598c0199c697124204abad36
 * @apiParam {String} id Users unique ID.
 * @apiSuccess (200) {String[]} users.name User's name
 * @apiSuccess (200) {String[]} users.surname User's surname
 * @apiSuccess (200) {String[]} users.user User's login
 * @apiSuccess (200) {String[]} users.password User's password
 * @apiSuccessExample {json} Success-Response:
    {
        "_id": "598c0199c697124204abad36",
        "name": "Victor",
        "surname": "Dieguez",
        "user": "vdg",
        "password": "1234",
        "__v": 0
    }
 * 
 *  
 * @apiParam {String} name User's name
 * @apiParam {String} surname  User's surname
 * @apiParam {String} user User's login
 * @apiParam {String} password  User's password
 * @apiParamExample {json} Request-Example:
  {
    "name": "Victor",
    "surname": "Dieguez",
    "user": "vdg",
    "password": "1234"
  }   
 * 
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 500 Internal error
 * {
    "message": "User validation failed: surname: Path `surname` is required.",
    "code": 500
  }
 * 
 */
exports.update = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if(!user){
      var err = new Object();
      err.message = 'This user does not exist';
      err.code = '200'
      dbUtil.manageDBError(err, res);
    }
    user.name = req.body.name;
    user.surname = req.body.surname;
    user.user = req.body.user;
    user.password = req.body.password;
    user.save(function (err) {
      dbUtil.manageDBError(err, res);
      res.status(200).jsonp(user);
    });
  });
};

