'use strict';

var express = require('express'),
    users = express.Router(),
    Model = require('../models/model-users.js'),
    passport = require('passport'),
    jwt = require('jwt-simple'),
    authConfig = require('../config/auth'),
    flash = require('connect-flash');
users.use(passport.initialize());
users.use(passport.session());
users.use(flash());

/**
* @api {post} /jabeja/api/user User SignUp
* @apiName signup
* @apiGroup User
*
* @apiParam {String} email  User's email address.
* @apiParam {String} email  User's password address.
* @apiParam {String} firstName  User's first name.
* @apiParam {String} middleName  User's middle name.
* @apiParam {String} lastName  User's last name.
* @apiParam {String} phone  User's phone.
* @apiParam {String} userFbId  User's facebook id.
*/
users.post('/signup', function(req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({success: false, msg: 'Please pass name and password.'});
  } else {
    var middleName = req.body['middleName'] ? req.body['middleName'] : "",
        phone = req.body['phone'] ? req.body['phone'] : "",
        email =  req.body['email'],
        userFbId = "";
    var newUser = new Model({
        email: email,
        password: req.body.password,
        firstName: req.body['firstName'],
        middleName: middleName,
        lastName: req.body['lastName'],
        phone: phone,
        userFbId: userFbId
    });
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      } else {
        return res.json({success: true, msg: 'Successful created new user.'});
      }
    });
  }
});

/**
* @api {post} /jabeja/api/user/auth/local Local Authentication
* @apiName local auth
* @apiGroup User
*
* @apiParam {String} email  User's email address.
* @apiParam {String} email  User's password address.
* @apiParam {String} firstName  User's first name.
* @apiParam {String} middleName  User's middle name.
* @apiParam {String} lastName  User's last name.
* @apiParam {String} phone  User's phone.
* @apiParam {String} userFbId  User's facebook id.
*/
users.post('/auth/local', function(req, res) {
  Model.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.send({success: false, token: 'Authentication failed. User not found.'});
    } else {
      user.comparePassword(req.body.password, function(error, isMatch) {
        if (isMatch && !error) {
          var token = jwt.encode(user, authConfig.jwt.secret);
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.send({success: false, token: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

/**
* @api {get} /jabeja/api/user/auth/facebook Facebook Authentication
* @apiName facebook auth
* @apiGroup User
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*        success : true
*        token : jwt token
*     }
*
* @apiFailureExample Failure-Response:
*     {
*        success : false
*        msg: Unauthorized
*     }
*/

users.get('/auth/facebook/token',
  passport.authenticate('facebook-token', {session: false}),
  function (req, res) {
    if (req.user) {
      res.send({success: true, token: req.user.jwtToken});
    } else {
      res.status(401).send({success: false, msg: 'Unauthorized'});
    }
  }
);

/**
* @api {get} /jabeja/api/user Get Users
* @apiName get users
* @apiGroup User
* @apiSuccess {Array} users  Array of users' information in json.
* @apiFailure {Number} 500  Error getting users.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     [
*       {
*         "email": "foo@bar.com",
*         "firstName": "foo",
*         "lastName": "bar",
*         "middleName": "mfoo",
*         "phone": "123123123123",
*         "userFbId": "123123123123"
*       }
*     ]
*
* @apiFailureExample Failure-Response:
*     HTTP/1.1 500 Error
*     {
*      "message" : "Error getting users."
*     }
*
*/
users.get('/info', passport.authenticate('jwt', {session: false}), function(req, res) {
  var token = getToken(req.headers);
  var decoded = jwt.decode(token, authConfig.jwt.secret);

  Model.find({
    email: decoded.email
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      return res.json({success: true, msg: user[0]});
    }
  });
});

/**
* @api {put} /jabeja/api/user/update Update Users.
* @apiName updateUser.
* @apiGroup User
*
* @apiParam {String} email  User's email address.
* @apiParam {String} firstName  User's first name.
* @apiParam {String} middleName  User's middle name.
* @apiParam {String} lastName  User's last name.
* @apiParam {String} phone  User's phone.
* @apiParam {String} userFbId  User's facebook id.
*
* @apiSuccess {String} email  User's email address.
* @apiSuccess {String} firstName  User's first name.
* @apiSuccess {String} middleName  User's middle name.
* @apiSuccess {String} lastName  User's last name.
* @apiSuccess {String} phone  User's phone.
* @apiSuccess {String} userFbId  User's facebook id.
*
* @apiFailure {Number} 404  No such user.
* @apiFailure {Number} 500  Error saving user.
* @apiFailure {Number} 500  Error getting user.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*        "message" : "saved",
*        "email" : "foo@bar.com"
*     }
*
* @apiFailureExample Failure-Response:
*     HTTP/1.1 500 Error
*     {
*       "message": "Error saving item.",
*       "error": "error error"
*     }
*
*/
users.put('/update', passport.authenticate('jwt', {session: false}), function(req, res) {
    var token = getToken(req.headers);
    var decoded = jwt.decode(token, authConfig.jwt.secret);
    Model.find({
      email: decoded.email
    }, function(err, existingUser){
      if (err) throw err;
      if (!existingUser) {
        return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        existingUser['email'] = existingUser['email'];
        existingUser['firstName'] = req.body['firstName'] ? req.body['firstName'] : existingUser['firstName'];
        existingUser['middleName'] = req.body['middleName'] ? req.body['middleName'] : existingUser['middleName'];
        existingUser['lastName'] = req.body['lastName'] ? req.body['lastName'] : existingUser['lastName'];
        existingUser['phone'] = req.body['phone'] ? req.body['phone'] : existingUser['phone'];
        existingUser['userFbId'] = req.body['userFbId'] ? req.body['userFbId'] : existingUser['userFbId'];
      }
    });
    Model.findOne({email: email}, function(err, existingUser){
        existingUser['email'] = req.body['email'] ? req.body['email'] : existingUser['email'];
        existingUser['firstName'] = req.body['firstName'] ? req.body['firstName'] : existingUser['firstName'];
        existingUser['middleName'] = req.body['middleName'] ? req.body['middleName'] : existingUser['middleName'];
        existingUser['lastName'] = req.body['lastName'] ? req.body['lastName'] : existingUser['lastName'];
        existingUser['phone'] = req.body['phone'] ? req.body['phone'] : existingUser['phone'];
        existingUser['userFbId'] = req.body['userFbId'] ? req.body['userFbId'] : existingUser['userFbId'];
        existingUser.save(function(err) {
          if (err) {
            return res.json({success: false, msg: 'Username already exists.'});
          } else {
            return res.json({success: true, msg: 'Successful update.'});
          }
        });
    });
});

function getToken(reqHeaders) {
  if (reqHeaders && reqHeaders.authorization) {
    var parted = reqHeaders.authorization.split(' ');
    if (parted.length == 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
}

module.exports = users;
