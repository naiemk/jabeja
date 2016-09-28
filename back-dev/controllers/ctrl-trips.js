'use strict';

var express = require('express'),
    trips = express.Router(),
    Model = require('../models/model-trips.js'),
    User = require('../models/model-users.js'),
    passport = require('passport'),
    jwt = require('jwt-simple'),
    authConfig = require('../config/auth'),
    flash = require('connect-flash');

trips.use(passport.initialize());
trips.use(passport.session());
trips.use(flash());
/**
* @api {get} /jabeja/api/trip Get Trips
* @apiName get trips
* @apiGroup Trip
* @apiSuccess {Array} trips  Array of Trip information in json.
* @apiFailure {Number} 500  Error getting trips.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     [
*       {
*         "userFbId" : "12123123123123123",
*         "userName" : "Foo Foobar",
*         "userEmail" : "foo@facebook.com",
*         "userPhone" : "+14259749694",
*         "deliveryType" : ["document", "box"],
*         "source" : "Seattle",
*         "dest" : "Dallas",
*         "travelDate" : "Wed Aug 17 2016",
*         "comment" : "blah blah blah!",
*         "serviceCharge" : "300"
*       }
*     ]
*
* @apiFailureExample Failure-Response:
*     HTTP/1.1 500 Error
*     Unauthorized.
*
* @apiFailureExample Failure-Response:
*     HTTP/1.1 500 Error
*     {
*      "message" : "Error getting trips."
*     }
*
*/
trips.get('/', passport.authenticate('jwt', {session: false}), function(req, res) {
  var token = getToken(req.headers);
  var decoded = jwt.decode(token, authConfig.jwt.secret);

  User.findOne({
    email: decoded.email
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      Model.find(function(err, trips){
        if(err) {
            return res.status(500).json({
                message: 'Error getting trips.'
            });
        }
        return res.status(200).json(trips);
      });
    }
  });
});

/**
* @api {post} /jabeja/api/trip Add Trip
* @apiName add trip
* @apiGroup Trip
*
* @apiParam {String} userFbId  Traveller's facebok id.
* @apiParam {String} userName  Traveller's full name.
* @apiParam {String} userEmail  Traveller's email.
* @apiParam {String} userPhone  Traveller's phone.
* @apiParam {String} deliveryType  Traveller's delivery type. Type is concatinated string by underline "_" Ex: "document_box"
* @apiParam {String} source  Traveller's source location.
* @apiParam {String} dest  Traveller's destination location.
* @apiParam {Date} travelDate  Travel date.
* @apiParam {String} comment  Traveller's comment.
* @apiSuccess {String} saved Trip saved.
* @apiSuccess {String} email Traveller's email.
* @apiSuccess {String} serviceCharge Delivery service charge.
* @apiFailure {Number} 500  Error saving item.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       message: 'saved',
*       email: "foo@bar.com"
*     }
*
* @apiFailureExample Failure-Response:
*     HTTP/1.1 500 Error
*     Unauthorized.
*
* @apiFailureExample Failure-Response:
*     HTTP/1.1 500 Error
*     {
*      "message" : "Error saving item.",
*      error: "ERROR Detail"
*     }
*
*/
trips.post('/', passport.authenticate('jwt', {session: false}), function(req, res) {
    var token = getToken(req.headers);
    var decoded = jwt.decode(token, authConfig.jwt.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
      if (err) throw err;
      if (!user) {
        res.send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        var phone = req.body['userPhone'] ? req.body['userPhone'] : "",
            comment = req.body['comment'] ? req.body['comment'] : "",
            deliveryType = req.body['deliveryType'].split("_"),
            source = req.body['source'],
            dest = req.body['dest'],
            travelDate = new Date(req.body['travelDate']).toISOString(),
            serviceCharge = req.body['serviceCharge'] ? Number(req.body['serviceCharge']) : 0,
            facebookId = user.facebookId ? user.facebookId : "";
        var trip = new Model({
            'userFbId': facebookId,
            'userName': decoded.firstName + " " + decoded.lastName,
            'userEmail': decoded.email,
            'userPhone': phone,
            'deliveryType': deliveryType,
            'source': source,
            'dest': dest,
            'travelDate': travelDate,
            'comment': comment,
            'serviceCharge': serviceCharge
        });
        //check and see if there is a post already
        Model.findOne({
            userEmail: decoded.email,
            deliveryType: deliveryType,
            source: source,
            dest: dest,
            travelDate: travelDate,
            serviceCharge: serviceCharge
          }, function(err, existingTrip){
            if(err) {
                return res.status(500).json({
                    message: 'Error getting trip.'
                });
            }
            if (existingTrip) {
              return res.status(200).json({message: 'trip exists.'});
            } else {
              trip.save(function(err, trip){
                if(err) {
                    return res.status(200).json({
                        message: 'Error saving item.',
                        error: err
                    });
                }
                return res.status(200).json({
                    message: 'saved',
                    email: trip.email
                });
              });
            }
        });
      }
    });
});

/**
* @api {get} /jabeja/api/trip/:email Get Passenger's Trips
* @apiName get passenger's trips
* @apiGroup Trip
*
* @apiParam {String} email User's unique email.
*
* @apiSuccess {Array} trips  Array of Trip information in json.
* @apiFailure {Number} 400  No such trip.
* @apiFailure {Number} 500  Error getting trips.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     [
*       {
*         "userFbId" : "12123123123123123",
*         "userName" : "Foo Foobar",
*         "userEmail" : "foo@facebook.com",
*         "userPhone" : "+14259749694",
*         "deliveryType" : ["document", "box"],
*         "source" : "Seattle",
*         "dest" : "Dallas",
*         "travelDate" : "Wed Aug 17 2016",
*         "comment" : "blah blah blah!",
*         "serviceCharge" : "300"
*       }
*     ]
* @apiFailureExample Failure-Response:
*     HTTP/1.1 500 Error
*     Unauthorized.
*
* @apiFailureExample Failure-Response:
*     HTTP/1.1 500 Error
*     {
*      "message" : "Error getting trips."
*     }
*
*/
trips.get('/:email',  passport.authenticate('jwt', {session: false}), function(req, res) {
  var token = getToken(req.headers);
  var decoded = jwt.decode(token, authConfig.jwt.secret);
  User.findOne({
    email: decoded.email
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      Model.find({userEmail: decoded.email}, function(err, trips) {
          if(err) {
              return res.status(500).json({
                  message: 'Error getting trip.'
              });
          }
          if(trips) {
            return res.status(200).json(trips);
          } else {
            return res.status(404).json({
                message: 'No trip posted for this user.'
            });
          }
      });
    }
  })
});

/**
* @api {get} /jabeja/api/trip/type/:type/source/:srouce/dest/:dest/date/:date/charge/:serviceCharge Search Trips
* @apiName search trips
* @apiGroup Trip
*
* @apiParam {String} type Type of delivery. Type is concatinated string by underline "_" Ex: "document_box"
* @apiParam {String} source Trip's source location.
* @apiParam {String} dest Trip's dest location.
* @apiParam {String} date Trip's date. Date format: YYYY-mm-dd.
*
* @apiSuccess {Array} trips  Array of Trip information in json.
* @apiFailure {Number} 400  No such trip.
* @apiFailure {Number} 500  Error getting trips.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     [
*       {
*         "userFbId" : "12123123123123123",
*         "userName" : "Foo Foobar",
*         "userEmail" : "foo@facebook.com",
*         "userPhone" : "+14259749694",
*         "deliveryType" : ["document", "box"],
*         "source" : "Seattle",
*         "dest" : "Dallas",
*         "travelDate" : "Wed Aug 17 2016",
*         "comment" : "blah blah blah!"
*         "serviceCharge" : "400"
*       }
*     ]
* @apiFailureExample Failure-Response:
*     HTTP/1.1 500 Error
*     Unauthorized.
*
* @apiFailureExample Failure-Response:
*     HTTP/1.1 500 Error
*     {
*      "message" : "Error getting trips."
*     }
* @apiDescription This API is for listing upcomming trips with requested delivery options
* and delivery date between now and requested travel date.
* API Example:  jabeja/api/trip/type/doc/source/city1/dest/city2/date/2016-08-23/
*/
trips.get('/type/:type/source/:source/dest/:dest/date/:date/', passport.authenticate('jwt', {session: false}),
  function(req, res) {
    var token = getToken(req.headers);
    var decoded = jwt.decode(token, authConfig.jwt.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
      if (err) throw err;
      if (!user) {
        res.send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        var deliveryType = req.params.type.split("_"),
            source = req.params.source,
            dest = req.params.dest,
            fullTravelDate = new Date(req.params.date),
            travelDateMonthAndYear = new Date(fullTravelDate.getFullYear(), fullTravelDate.getMonth(), 30).toISOString(),
            today = new Date().toISOString();
        Model.find({
            deliveryType: {'$in' : deliveryType},
            source: source,
            dest: dest,
            travelDate: {'$gte' : new Date(today), '$lt': new Date(travelDateMonthAndYear)}
          }, function(err, trips){
            if(err) {
                return res.status(500).json({
                    message: 'Error getting trip.'
                });
            }
            if(trips) {
              return res.status(200).json(trips);
            } else {
              return res.status(400).json({
                  message: 'No such trip.'
              });
            }
        });
      }
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

module.exports = trips;
