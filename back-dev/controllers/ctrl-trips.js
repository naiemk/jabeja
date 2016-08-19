'use strict';

var trips = require('express').Router(),
    Model = require('../models/model-trips.js');

/**
* @api {get} /jabeja/api/trip Get all trips.
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
*         "deliveryType" : ["document", "money"],
*         "source" : "Seattle",
*         "dest" : "Dallas",
*         "travelDate" : "Wed Aug 17 2016",
*         "comment" : "blah blah blah!"
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
          return res.json(500, {
              message: 'Error getting trips.'
          });
      }
      return res.json(trips);
    });
});

/**
* @api {post} /jabeja/api/trip/ Update a trip with specified attributes.
* @apiName addTrip
* @apiGroup Trip
*
* @apiParam {String} userFbId  Traveller's facebok id.
* @apiParam {String} userName  Traveller's full name.
* @apiParam {String} userEmail  Traveller's email.
* @apiParam {String} userPhone  Traveller's phone.
* @apiParam {String} deliveryType  Traveller's delivery type. Type is concatinated string by underline "_" Ex: "document_money"
* @apiParam {String} source  Traveller's source location.
* @apiParam {String} dest  Traveller's destination location.
* @apiParam {Date} travelDate  Travel date.
* @apiParam {String} comment  Traveller's comment.
* @apiSuccess {String} saved Trip saved.
* @apiSuccess {String} email Traveller's email.
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
    var trip = new Model({
        'userFbId': req.body['userFbId'],
        'userName': req.body['userName'],
        'userEmail': req.body['userEmail'],
        'userPhone': req.body['userPhone'],
        'deliveryType': req.body['deliveryType'].split("_")
        'source': req.body['source'],
        'dest': req.body['dest'],
        'travelDate': new Date(req.body['travelDate']),
        'comment': req.body['comment']
    });

    trip.save(function(err, trip){
          if(err) {
              return res.json(500, {
                  message: 'Error saving item.',
                  error: err
              });
          }
          return res.json({
              message: 'saved',
              email: trip.email
          });
    });
});

/**
* @api {get} /jabeja/api/trip/:email Get all trips for this person.
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
*         "deliveryType" : ["document", "money"],
*         "source" : "Seattle",
*         "dest" : "Dallas",
*         "travelDate" : "Wed Aug 17 2016",
*         "comment" : "blah blah blah!"
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
    var id = req.params.email;
    Model.find({userEmail: email}, function(err, trips){
        if(err) {
            return res.json(500, {
                message: 'Error getting trip.'
            });
        }
        if(!trips) {
            return res.json(404, {
                message: 'No such trip.'
            });
        }
        return res.json(trips);
    });
});

/**
* @api {get} /jabeja/api/trip/:type.:source.:dest.:date Search all trips with specified attributes.
* @apiName searchTrips.
* @apiGroup Trip
*
* @apiParam {String} type Type of delivery. Type is concatinated string by underline "_" Ex: "document_money"
* @apiParam {String} source Trip's source location.
* @apiParam {String} dest Trip's dest location.
* @apiParam {String} date Trip's date.
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
*         "deliveryType" : ["document", "money"],
*         "source" : "Seattle",
*         "dest" : "Dallas",
*         "travelDate" : "Wed Aug 17 2016",
*         "comment" : "blah blah blah!"
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
trips.get('/:type.:srouce.:dest.:date', function(req, res) {
    var deliveryType = req.params.type.split("_"),
        source = req.params.source,
        dest = req.params.dest,
        travelDate = new Date(req.params.date);

    Model.find({
        deliveryType: deliveryType,
        source: source,
        dest: dest,
        travelDate: travelDate
      }, function(err, trips){
        if(err) {
            return res.json(500, {
                message: 'Error getting trip.'
            });
        }
        if(!trips) {
            return res.json(404, {
                message: 'No such trip.'
            });
        }
        return res.json(trips);
    });
});

/**
* @api {put} /jabeja/api/trip/:date.:email.:dest.:source.:type Update a trip with specified attributes.
* @apiName updateTrip
* @apiGroup Trip
*
* @apiParam {String} type Type of delivery. Type is concatinated string by underline "_" Ex: "document_money"
* @apiParam {String} source Trip's source location.
* @apiParam {String} dest Trip's dest location.
* @apiParam {String} date Trip's date.
* @apiParam {String} email Traveller's email.
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
*     {
*       "userFbId" : "12123123123123123",
*       "userName" : "Foo Foobar",
*       "userEmail" : "foo@facebook.com",
*       "userPhone" : "+14259749694",
*       "deliveryType" : ["document", "money"],
*       "source" : "Seattle",
*       "dest" : "Dallas",
*       "travelDate" : "Wed Aug 17 2016",
*       "comment" : "blah blah blah!"
*     }
*
* @apiFailureExample Failure-Response:
*     HTTP/1.1 500 Error
*     {
*      "message" : "Error getting trips."
*     }
*
*/
trips.put('/:date.:email.:dest.:source.:type', function(req, res) {
  var deliveryType = req.params.type.split("_"),
      source = req.params.source,
      dest = req.params.dest,
      travelDate = new Date(req.params.date),
      email = req.params.email;

    Model.findOne({
        email: email,
        deliveryType: deliveryType,
        dest: dest,
        source: source,
        travelDate: travelDate
      }, function(err, trip){
            if(err) {
                return res.json(500, {
                    message: 'Error saving trip',
                    error: err
                });
            }
            if(!trip) {
                return res.json(404, {
                    message: 'No such trip'
                });
            }
            trip['userFbId'] = req.body['userFbId'] ? req.body['userFbId'] : trip['userFbId'];
            trip['userName'] = req.body['userName'] ? req.body['userName'] : trip['userName'];
            trip['userEmail'] = req.body['userEmail'] ? req.body['userEmail'] : trip['userEmail'];
            trip['userPhone'] = req.body['userPhone'] ? req.body['userPhone'] : trip['userPhone'];
            trip['deliveryType'] = req.body['deliveryType'] ? req.body['deliveryType'].split("_") : trip['deliveryType'];
            trip['source'] = req.body['source'] ? req.body['source'] : trip['source'];
            trip['dest'] = req.body['dest'] ? req.body['dest'] : trip['dest'];
            trip['travelDate'] = req.body['travelDate'] ? new Date(req.body['travelDate']) : trip['travelDate'];
            trip['comment'] = req.body['comment'] ? req.body['comment'] : trip['comment'];
            trip.save(function(err, trip){
                if(err) {
                    return res.json(500, {
                        message: 'Error getting trip.'
                    });
                }
                if(!trip) {
                    return res.json(404, {
                        message: 'No such trip'
                    });
                }
                return res.json(trip);
            });
    });
});

/**
* @api {delete} /jabeja/api/trip/:date.:email.:dest.:source.:type Update a trip with specified attributes.
* @apiName Search trips.
* @apiGroup Trip
*
* @apiParam {String} type Type of delivery. Type is concatinated string by underline "_" Ex: "document_money"
* @apiParam {String} source Trip's source location.
* @apiParam {String} dest Trip's dest location.
* @apiParam {String} date Trip's date.
* @apiParam {String} email Traveller's email.
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
*     {
*       "userFbId" : "12123123123123123",
*       "userName" : "Foo Foobar",
*       "userEmail" : "foo@facebook.com",
*       "userPhone" : "+14259749694",
*       "deliveryType" : ["document", "money"],
*       "source" : "Seattle",
*       "dest" : "Dallas",
*       "travelDate" : "Wed Aug 17 2016",
*       "comment" : "blah blah blah!"
*     }
*
* @apiFailureExample Failure-Response:
*     HTTP/1.1 500 Error
*     {
*      "message" : "Error getting trips."
*     }
*
*/
trips.delete('/:date.:email.:dest.:source.:type', function(req, res) {
  var deliveryType = req.params.type.split("_"),
      source = req.params.source,
      dest = req.params.dest,
      travelDate = new Date(req.params.date),
      email = req.params.email;
      Model.findOne({
          email: email,
          deliveryType: deliveryType,
          dest: dest,
          source: source,
          travelDate: travelDate
        }, function(err, trip){
            if(err) {
                return res.json(500, {
                    message: 'Error getting trip.'
                });
            }
            if(!trip) {
                return res.json(404, {
                    message: 'No such trip'
                });
            }
            return res.json(trip);
    });
});

module.exports.trips = trips;
