'use strict';

var users = require('express').Router(),
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
  *         "phone": "123123123123",
  *         "userFbId": "123123123123",
  *         "dob": Date(Fri Aug 19 2016 15:49:01 GMT-0400 (EDT))
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
* @apiParam {String} lastName  User's last name.
* @apiParam {String} phone  User's phone.
* @apiParam {String} userFbId  User's facebook id.
* @apiParam {Date} dob  User's date of birth.
*
* @apiSuccess {String} message  saved.
* @apiSuccess {String} emial user's emial.
* @apiFailure {Number} 500  Error saving item.
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
users.post('/', function(req, res) {
    var user = new Model({
        'email': req.body['email'],
        'firstName': req.body['firstName'],
        'lastName': req.body['lastName'],
        'phone': req.body['phone'],
        'userFbId': req.body['userFbId'],
        'dob': req.body['dob'] ? new Date(req.body['dob']) : null
    });
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
* @apiSuccess {String} lastName  User's last name.
* @apiSuccess {String} phone  User's phone.
* @apiSuccess {String} userFbId  User's facebook id.
* @apiSuccess {Date} dob  User's date of birth.
*
* @apiFailure {Number} 500  Error getting users.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "email": "foo@bar.com",
*       "firstName": "foo",
*       "lastName": "bar",
*       "phone": "123123123123",
*       "userFbId": "123123123123",
*       "dob": Date(Fri Aug 19 2016 15:49:01 GMT-0400 (EDT))
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
    var id = req.params.id;
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
* @apiParam {String} lastName  User's last name.
* @apiParam {String} phone  User's phone.
* @apiParam {String} userFbId  User's facebook id.
* @apiParam {Date} dob  User's date of birth.
*
* @apiSuccess {String} email  User's email address.
* @apiSuccess {String} firstName  User's first name.
* @apiSuccess {String} lastName  User's last name.
* @apiSuccess {String} phone  User's phone.
* @apiSuccess {String} userFbId  User's facebook id.
* @apiSuccess {Date} dob  User's date of birth.
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
        user['lastName'] = req.body['lastName'] ? req.body['lastName'] : user['lastName'];
        user['phone'] = req.body['phone'] ? req.body['phone'] : user['phone'];
        user['userFbId'] = req.body['userFbId'] ? req.body['userFbId'] : user['userFbId'];
        user['dob'] = req.body['dob'] ? new Date(req.body['dob']) : user['dob'];
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
* @apiSuccess {String} userFbId  Traveller's facebok id.
* @apiSuccess {String} userName  Traveller's full name.
* @apiSuccess {String} userEmail  Traveller's email.
* @apiSuccess {String} userPhone  Traveller's phone.
* @apiSuccess {String} deliveryType  Traveller's delivery type.
* @apiSuccess {String} source  Traveller's source location.
* @apiSuccess {String} dest  Traveller's destination location.
* @apiSuccess {Date} travelDate  Travel date.
* @apiSuccess {String} comment  Traveller's comment.
* @apiFailure {Number} 400  No such trip.
* @apiFailure {Number} 500  Error getting trips.
*

* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     [{
*       "userFbId" : "12123123123123123",
*       "userName" : "Foo Foobar",
*       "userEmail" : "foo@facebook.com",
*       "userPhone" : "+14259749694",
*       "deliveryType" : ["document", "money"],
*       "source" : "Seattle",
*       "dest" : "Dallas",
*       "travelDate" : "Wed Aug 17 2016",
*       "comment" : "blah blah blah!"
*     }]
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

module.exports.users = users;
