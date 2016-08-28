'use strict';

var express = require('express'),
    trips = express.Router(),
    Model = require('../models/model-trips.js');

/**
* @api {get} /jabeja/api/trip getTrips.
* @apiName getTrips
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
*     {
*      "message" : "Error getting trips."
*     }
*
*/
trips.get('/', function(req, res) {
    Model.find(function(err, trips){
      if(err) {
          return res.status(500).json({
              message: 'Error getting trips.'
          });
      }
      return res.status(200).json(trips);
    });
});

/**
* @api {post} /jabeja/api/trip addTrip.
* @apiName addTrip
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
*     {
*      "message" : "Error saving item.",
*      error: "ERROR Detail"
*     }
*
*/
trips.post('/', function(req, res) {
    var phone = req.body['userPhone'] ? req.body['userPhone'] : "",
        comment = req.body['comment'] ? req.body['comment'] : "",
        email = req.body['userEmail'],
        deliveryType = req.body['deliveryType'].split("_"),
        source = req.body['source'],
        dest = req.body['dest'],
        travelDate = new Date(req.body['travelDate']).toISOString(),
        serviceCharge = req.body['serviceCharge'] ? Number(req.body['serviceCharge']) : 0;

    var trip = new Model({
        'userFbId': req.body['userFbId'],
        'userName': req.body['userName'],
        'userEmail': email,
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
        userEmail: email,
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
});

/**
* @api {get} /jabeja/api/trip/:email getTravellersTrips.
* @apiName getTravellersTrips
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
*
* @apiFailureExample Failure-Response:
*     HTTP/1.1 500 Error
*     {
*      "message" : "Error getting trips."
*     }
*
*/
trips.get('/:email', function(req, res) {
    var email = req.params.email;
    Model.find({userEmail: email}, function(err, trips){
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
});

/**
* @api {get} /jabeja/api/trip/type/:type/source/:srouce/dest/:dest/date/:date/charge/:serviceCharge searchTrips.
* @apiName searchTrips.
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
trips.get('/type/:type/source/:source/dest/:dest/date/:date/', function(req, res) {
    var deliveryType = req.params.type.split("_"),
        source = req.params.source,
        dest = req.params.dest,
        travelDate = new Date(req.params.date).toISOString(),
        today = new Date().toISOString();

    Model.find({
        deliveryType: {'$in' : deliveryType},
        source: source,
        dest: dest,
        travelDate: {'$gte' : new Date(today), '$lte': new Date(travelDate)}
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
});

/**
* @api {put} /jabeja/api/trip/date/:date/email/:email/dest/:dest/source/:source/type/:type/charge/:serviceCharge updateTrip.
* @apiName updateTrip
* @apiGroup Trip
*
* @apiParam {String} type Type of delivery. Type is concatinated string by underline "_" Ex: "document_box"
* @apiParam {String} source Trip's source location.
* @apiParam {String} dest Trip's dest location.
* @apiParam {String} date Trip's date.
* @apiParam {String} email Traveller's email.
* @apiParam {String} serviceCharge Traveller's delivery service charge
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
* @apiSuccess {String} serviceCharge  Traveller's delivery service charge
* @apiFailure {Number} 400  No such trip.
* @apiFailure {Number} 500  Error getting trips.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "userFbId" : "12123123123123123",
*       "userName" : "Foo Foobar",
*       "userEmail" : "foo@facebook.com",
*       "userPhone" : "+14259749694",
*       "deliveryType" : ["document", "box"],
*       "source" : "Seattle",
*       "dest" : "Dallas",
*       "travelDate" : "Wed Aug 17 2016",
*       "comment" : "blah blah blah!",
*       "serviceCharge" : "330"
*     }
*
* @apiFailureExample Failure-Response:
*     HTTP/1.1 500 Error
*     {
*      "message" : "Error getting trips."
*     }
*
*/
trips.put('/date/:date/email/:email/dest/:dest/source/:source/type/:type/charge/:serviceCharge', function(req, res) {
  var deliveryType = req.params.type.split("_"),
      source = req.params.source,
      dest = req.params.dest,
      travelDate = new Date(req.params.date).toISOString(),
      email = req.params.email,
      serviceCharge = Numver(req.params.serviceCharge);

    Model.findOne({
        userEmail: email,
        deliveryType: deliveryType,
        dest: dest,
        source: source,
        travelDate: new Date(travelDate)
      }, function(err, trip){
            if(err) {
                return res.status(500).json({
                    message: 'Error saving trip',
                    error: err
                });
            }

            if (trip) {
              trip['userFbId'] = req.body['userFbId'] ? req.body['userFbId'] : trip['userFbId'];
              trip['userName'] = req.body['userName'] ? req.body['userName'] : trip['userName'];
              trip['userEmail'] = req.body['userEmail'] ? req.body['userEmail'] : trip['userEmail'];
              trip['userPhone'] = req.body['userPhone'] ? req.body['userPhone'] : trip['userPhone'];
              trip['deliveryType'] = req.body['deliveryType'] ? req.body['deliveryType'].split("_") : trip['deliveryType'];
              trip['source'] = req.body['source'] ? req.body['source'] : trip['source'];
              trip['dest'] = req.body['dest'] ? req.body['dest'] : trip['dest'];
              trip['travelDate'] = req.body['travelDate'] ? new Date(new Date(req.body['travelDate']).toISOString()) : trip['travelDate'];
              trip['comment'] = req.body['comment'] ? req.body['comment'] : trip['comment'];
              trip['serviceCharge'] = req.body['serviceCharge'] ? Number(req.body['serviceCharge']) : 0;
              trip.save(function(err, updatedTrip){
                  if(err) {
                      return res.status(500).json({
                          message: 'Error getting trip.'
                      });
                  }
                  if (updatedTrip) {
                    return res.json(updatedTrip);
                  } else {
                    return res.status(404).json({
                        message: 'No such trip'
                    });
                  }
              });
            } else {
              return res.status(404).json({
                  message: 'No such trip'
              });
            }
    });
});

/**
* @api {delete} /jabeja/api/trip/:date.:email.:dest.:source.:type deleteTrip.
* @apiName deleteTrip
* @apiGroup Trip
*
* @apiParam {String} type Type of delivery. Type is concatinated string by underline "_" Ex: "document_box"
* @apiParam {String} source Trip's source location.
* @apiParam {String} dest Trip's dest location.
* @apiParam {String} date Trip's date.
* @apiParam {String} email Traveller's email.
*
* @apiSuccess {String} Message  success.
* @apiFailure {Number} 400  No such trip.
* @apiFailure {Number} 500  Error getting trips.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "message": "success"
*     }
*
* @apiFailureExample Failure-Response:
*     HTTP/1.1 500 Error
*     {
*      "message" : "Error getting trips."
*     }
*
*/
trips.delete('/date/:date/email/:email/dest/:dest/source/:source/type/:type', function(req, res) {
  var deliveryType = req.params.type.split("_"),
      source = req.params.source,
      dest = req.params.dest,
      travelDate = new Date(req.params.date).toISOString(),
      email = req.params.email;
      Model.remove({
          userEmail: email,
          deliveryType: deliveryType,
          dest: dest,
          source: source,
          travelDate: new Date(travelDate)
        }, function(err, deleteResult){
          if(err) {
              return res.status(500).json({
                message: 'Error getting trip.'
              });
          }
          if (deleteResult) {
            if (deleteResult.result.n) {
              return res.status(200).json({message: 'success'});
            } else {
              return res.status(404).json({message: 'No such trip'});
            }
          } else {
            return res.status(404).json({
              message: 'No such trip'
            });
          }
    });
});

/**
* @api {delete} /jabeja/api/trip/:email deleteTrips.
* @apiName deleteTrips
* @apiGroup Trip
*
* @apiParam {String} email Traveller's email.
*
* @apiSuccess {String} Message  success.
* @apiFailure {Number} 400  No trip found.
* @apiFailure {Number} 500  Error getting trips.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     {
*       "message": "success"
*     }
*
* @apiFailureExample Failure-Response:
*     HTTP/1.1 500 Error
*     {
*      "message" : "Error getting trips."
*     }
*
*/
trips.delete('/email/:email', function(req, res) {
  var email = req.params.email;
  Model.remove({userEmail: email}, function(err, deleteResult){
    if(err) {
      return res.status(500).json({
        message: 'Error getting trip.'
      });
    }
    if (deleteResult) {
      if (deleteResult.result.n) {
        return res.status(200).json({message: 'success'});
      } else {
        return res.status(404).json({message: 'No trip found'});
      }
    } else {
      return res.status(404).json({
        message: 'No trip found'
      });
    }
  });
});

module.exports = trips;
