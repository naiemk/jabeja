'use strict';

var express = require('express'),
    users = express.Router(),
    Model = require('../models/model-users.js');

  /**
  * @api {get} /jabeja/api/user getUsers.
  * @apiName getUsers.
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
users.get('/', function(req, res) {
    Model.find(function(err, users){
        if(err) {
            return res.json(500, {
                message: 'Error getting users.'
            });
        }
        return res.json(users);
    });
});

/**
* @api {post} /jabeja/api/user addUser.
* @apiName addUser.
* @apiGroup User
*
* @apiParam {String} email  User's email address.
* @apiParam {String} firstName  User's first name.
* @apiParam {String} middleName  User's middle name.
* @apiParam {String} lastName  User's last name.
* @apiParam {String} phone  User's phone.
* @apiParam {String} userFbId  User's facebook id.
*
* @apiSuccess {String} message  saved.
* @apiSuccess {String} message  user exists.
* @apiSuccess {String} emial user's emial.
* @apiFailure {Number} 500  Error saving item.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*        "message" : "saved",
*        "email" : "foo@bar.com"
*     }

* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*        "message" : "user exists"
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
users.post('/', function(req, res) {
    var middleName = req.body['middleName'] ? req.body['middleName'] : "",
        phone = req.body['phone'] ? req.body['phone'] : "",
        email =  req.body['email'];
    var user = new Model({
        'email': email,
        'firstName': req.body['firstName'],
        'middleName': middleName,
        'lastName': req.body['lastName'],
        'phone': phone,
        'userFbId': req.body['userFbId']
    });
    Model.findOne({email: email}, function(err, user){
          if(err) {
              return res.json(500, {
                  message: 'Error getting user.'
              });
          }
          // if user doesn't already exist add one
          if(!user) {
            user.save(function(err, user){
                if(err) {
                    return res.json(500, {
                        message: 'Error saving item.',
                        error: err
                    });
                }
                return res.json({
                    message: 'saved',
                    email: user.email
                });
            });
          }
          return res.json(200, {
              message: 'user exists.'
          });
    });
});

/**
* @api {get} /jabeja/api/user/:email getUser.
* @apiName getUser.
* @apiGroup User
*
* @apiParam {String} email  User's email address.
*
* @apiSuccess {String} email  User's email address.
* @apiSuccess {String} firstName  User's first name.
* @apiSuccess {String} middleName  User's middle name.
* @apiSuccess {String} lastName  User's last name.
* @apiSuccess {String} phone  User's phone.
* @apiSuccess {String} userFbId  User's facebook id.
*
* @apiFailure {Number} 500  Error getting users.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "email": "foo@bar.com",
*       "firstName": "foo",
*       "middleName": "middlefoo",
*       "lastName": "bar",
*       "phone": "123123123123",
*       "userFbId": "123123123123",
*     }
*
* @apiFailureExample Failure-Response:
*     HTTP/1.1 500 Error
*     {
*      "message" : "Error getting user."
*     }
*
*/
users.get('/:email', function(req, res) {
    var email = req.params.email;
    Model.findOne({email: email}, function(err, user){
          if(err) {
              return res.json(500, {
                  message: 'Error getting user.'
              });
          }
          if(!user) {
              return res.json(404, {
                  message: 'No such user.'
              });
          }
          return res.json(user);
    });
});

/**
* @api {put} /jabeja/api/user/:email updateUser.
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
users.put('/:email', function(req, res) {
    var email = req.params.email;
    Model.findOne({email: email}, function(err, user){
        if(err) {
            return res.json(500, {
                message: 'Error saving user',
                error: err
            });
        }
        if(!user) {
            return res.json(404, {
                message: 'No such user'
            });
        }
        user['email'] = req.body['email'] ? req.body['email'] : user['email'];
        user['firstName'] = req.body['firstName'] ? req.body['firstName'] : user['firstName'];
        user['middleName'] = req.body['middleName'] ? req.body['middleName'] : user['middleName'];
        user['lastName'] = req.body['lastName'] ? req.body['lastName'] : user['lastName'];
        user['phone'] = req.body['phone'] ? req.body['phone'] : user['phone'];
        user['userFbId'] = req.body['userFbId'] ? req.body['userFbId'] : user['userFbId'];
        user.save(function(err, user){
            if(err) {
                return res.json(500, {
                    message: 'Error getting user.'
                });
            }
            if(!user) {
                return res.json(404, {
                    message: 'No such user'
                });
            }
            return res.json(user);
        });
    });
});

/**
* @api {delete} /jabeja/api/user/:email deleteUser.
* @apiName deleteUser
* @apiGroup User
*
* @apiParam {String} email User's email.
*
* @apiSuccess {String} email  User's email address.
* @apiSuccess {String} firstName  User's first name.
* @apiSuccess {String} middleName  User's middle name.
* @apiSuccess {String} lastName  User's last name.
* @apiSuccess {String} phone  User's phone.
* @apiSuccess {String} userFbId  User's facebook id.
* @apiFailure {Number} 400  No such trip.
* @apiFailure {Number} 500  Error getting trips.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "email": "foo@bar.com",
*       "firstName": "foo",
*       "middleName": "middlefoo",
*       "lastName": "bar",
*       "phone": "123123123123",
*       "userFbId": "123123123123",
*     }
*
* @apiFailureExample Failure-Response:
*     HTTP/1.1 500 Error
*     {
*      "message" : "Error getting trips."
*     }
*
 * @apiDescription When you call this api, you should also
 * call the delete API for trips with email ID (deleteTrips API).
 */
users.delete('/:email', function(req, res) {
    var email = req.params.email;
    Model.findOne({email: email}, function(err, user){
        if(err) {
            return res.json(500, {
                message: 'Error getting user.'
            });
        }
        if(!user) {
            return res.json(404, {
                message: 'No such user'
            });
        }
        return res.json(user);
    });
});

module.exports = users;
