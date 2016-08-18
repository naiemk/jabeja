var express = require('express'),
    app = express(),
    conf = require('./config'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path');
    User = require('./models/user'),
    Trip = require('./models/trip'),
    app = express(),
    databaseUrl = conf.databaseUrl + conf.databaseName,
    port = process.env.PORT || conf.devport;

// we are using Express router for routing between APIs
var router = express.Router();

// all of our APIs are prefixed with "jabeja/api"
// Example: http://jabeja.com/jabeja/api/
app.use('/jabeja/api', router);

// Trip API
router.route('/trip')
  /**
  * @api {post} /jabeja/api/trip Post a trip information
  * @apiName addTrip
  * @apiGroup Trip
  *
  * @apiParam {String} userId User unique ID by Facebook.
  * @apiParam {String} userFullName User Full Name by Facebook (FirstName<space>LastName)
  * @apiParam {String} email User's email.
  * @apiParam {Number} rate User's rate. => Calculated from Facebook mutal friends.
  * @apiParam {String} deliveryType Type of delivery, documnet, money, both.
  * @apiParam {String} source Trip's source.
  * @apiParam {String} dest Trip's destination.
  * @apiParam {String} finishDate Trip's date.
  * @apiParam {String} comment Trip's date.
  *
  * @apiSuccess {json} message success.
  * @apiFailure {String} duplicate duplicate
  * @apiFailure {String} WrongDelivery wrong parameter - (delivery type)
  */
  .post(function(req, res) {
    console.log("TRIP IS", req.body);
    var trip = new Trip();
    trip.userId = req.body.userId;
    trip.userFullName = req.body.userFullName;
    trip.email = req.body.email;
    trip.phone = req.body.phone;
    trip.deliveryType = req.body.deliveryType;
    trip.source = req.body.source;
    trip.dest = req.body.dest;
    trip.travelDate = req.body.travelDate;
    trip.comment = req.body.comment;

    //validation on deliveryType {document, money, both}
    var deliveryType = trip.deliveryType.toLowerCase();
    if (deliveryType != "money" &&
        deliveryType != "document" &&
        deliveryType != "both") {
      res.json({message : 'WrongDelivery'});
    }

    // check if there is a duplicate record already
    Trip.count({
      userId: trip.userId,
      userFullName : trip.userFullName,
      email : trip.email,
      phone : trip.phone,
      deliveryType : trip.deliveryType,
      source : trip.source,
      dest : trip.dest,
      travelDate : trip.travelDate,
      comment: trip.comment
      }, function(err, c) {
        if (err)
          res.send(err);
        else {
          //same record already exists.
          if (c !== 0) res.json({message: 'duplicate', userId: trip.userId});
          else {
            trip.save(function(err) {
                if (err)
                  res.send(err);
                else
                  res.json({message: 'success'});
            });
          }
        }
      });
  })

  /**
  * @api {get} /jabeja/api/trip Get all trips.
  * @apiName getTrips
  * @apiGroup Trip
  * @apiSuccess {String} deliveryType  Trip's desired delivery type.
  * @apiSuccess {String} source  Trip's source city.
  * @apiSuccess {String} dest  Trip's destination city.
  * @apiSuccess {String} travelDate  Trip's date.
  * @apiSuccess {String} comment  Trip's comment.
  *
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     [
          {
  *         "userId" : "12123123123123123",
  *         "userFullName" : "Foo Foobar",
  *         "email" : "foo@facebook.com",
  *         "phone" : "+14259749694",
  *         "deliveryType" : "document",
  *         "source" : "Seattle",
  *         "dest" : "Tehran",
  *         "travelDate" : "Wed Aug 17 2016",
  *         "comment" : "blah blah blah!"
  *       }
  *     ]
  */
  .get(function(req, res) {
    Trip.find(function(err, trips) {
      if (err)
        res.send(err);
      else
        res.json(trips);
    });
  })

  /**
  * @api {delete} /jabeja/api/trip Delete a trip.
  * @apiName deleteTrip
  * @apiGroup Trip
  *
  * @apiParam {String} userId User unique ID by Facebook.
  * @apiParam {String} userFullName User name by Facebook.
  * @apiParam {String} email User's email.
  * @apiParam {String} phone User's email.
  * @apiParam {String} deliveryType Type of delivery, documnet, money, both.
  * @apiParam {String} source Trip's source.
  * @apiParam {String} dest Trip's destination.
  * @apiParam {String} travelDate Trip's date.
  * @apiParam {String} comment Trip's comment.
  *
  * @apiSuccess {json} message success.
  */
  .delete(function(req, res) {
    Trip.remove({userId: req.params.userId,
      userFullName : req.params.userFullName,
      email : req.params.email,
      phone : req.params.phone,
      deliveryType : req.params.deliveryType,
      source : req.params.source,
      dest : req.params.dest,
      travelDate : req.params.travelDate,
      comment: req.params.comment}, function(err) {
        if (err)
          res.send(err);
        else res.json({message: 'success'});
    });
  });

/**
* @api {get} /jabeja/api/search/:type/:source/:destination Search trips.
* @apiName searchTrips
* @apiGroup Search
*
* @apiParam {String} userId Travellers's Facebook Id.
* @apiParam {String} userFullName Traveller's Full Name.
* @apiParam {String} email Traveller's Email.
* @apiParam {String} phone Traveller's Phone number.
* @apiSuccess {String} deliveryType  Trip's desired delivery type.
* @apiSuccess {String} source  Trip's source city.
* @apiSuccess {String} dest  Trip's destination city.
* @apiSuccess {String} travelDate  Trip's date.
* @apiSuccess {String} comment  Trip's comment.
*
* @apiSuccessExample Success-Response:
*     HTTP/1.1 200 OK
*     [
        {
*         "userId" : "12123123123123123",
*         "userFullName" : "Foo Foobar",
*         "email" : "foo@facebook.com",
*         "phone" : "+14259749694",
*         "deliveryType" : "document",
*         "source" : "Seattle",
*         "dest" : "Tehran",
*         "travelDate" : "Wed Aug 17 2016",
*         "comment" : "blah blah blah!"
*       }
*      ]
*
* @apiFailure {String} WrongDelivery wrong parameter - (delivery type)
*/
router.route('/trip/search/:type/:source/:destination')
  .get(function(req, res) {

    //validation on deliveryType {document, money, both}
    var deliveryType = req.params.type.toLowerCase();
    if (deliveryType != "money" &&
        deliveryType != "document" &&
        deliveryType != "both") {
      res.json({message : 'WrongDelivery'});
    }
    Trip.find({deliveryType: req.params.type,
      source : req.params.source,
      destination: req.params.destinatin
    }, function(err, trips) {
      if (err)
        res.send(err);
      else
        res.json(trips);
    });
  });

// User API
router.route('/user') // I also added user, commenting this out for now

  /**
  * @api {post} /jabeja/api/user Add a user.
  * @apiName addUser
  * @apiGroup User
  *
  * @apiParam {String} userId User unique ID by Facebook.
  * @apiParam {String} firstName User first name by Facebook.
  * @apiParam {String} lastName User last name by Facebook.
  * @apiParam {String} email User's email by Facebook.
  * @apiParam {Number} phone User's phone either Facebook or User.
  *
  * @apiSuccess {String} success duplicate user.
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
  *       "message" : "success"
  *     }
  * @apiFailure {String} DuplicateUser duplicate user.
  */
  .post(function(req, res) {
    var user = new User();
    user.userId = req.body.userId;
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.phone = req.body.phone;

    User.count({
        email : user.email
      }, function(err, c) {
        if (c !== 0) res.json({message: 'DuplicateUser'});
        else {
          user.save(function(err) {
              if (err)
                res.send(err);
              else
                res.json({message: 'success'});
          });
        }
      });
  })

  /**
  * @api {get} /jabeja/api/user Get a user.
  * @apiName getUser
  * @apiGroup User
  *
  * @apiParam {String} email User email.
  *
  * @apiSuccess {String} id  User's Facebook ID
  * @apiSuccess {String} firstName  User's First Name
  * @apiSuccess {String} lastName  User's Last Name
  * @apiSuccess {String} email  user's Email
  * @apiSuccess {String} phone  user's Phone
  * @apiSuccessExample Success-Response:
  *     HTTP/1.1 200 OK
  *     {
  *       "id" : "12123123123123123",
  *       "firstName" : "Foo",
  *       "lastName" : "Foobar"
  *       "email" : "foo@facebook.com",
  *       "phone" : "+14259749694"
  *     }
  * @apiFailure {String} UserNotFound Invalid user.
  */
  .get(function(req, res) {
    var email = req.query.email;
    User.findOne({email: email}, function(err, user) {
      if (err) res.json({message: 'UserNotFound'})
      else {
        res.json({
          id: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone
        });
      }
    });
  });

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(
  path.join(__dirname+'/../front-end/ui')
));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/../front-end/ui/index.html'));
});

app.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname+'/../front-end/ui/login.html'));
});

app.findUser = function(userId, callBack) {
  User.findOne({ id: userId }, function(err, user) {
    console.log(err, user)
    if (!err) {
      callBack(user);
    };
  });
};

app.listen(port);
console.log("Server is running on port: " + port);
