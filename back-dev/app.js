var express = require('express'),
    app = express(),
    conf = require('./config'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path');
    User = require('./models/user'),
    Trip = require('./models/trip'),
    app = express(),
    databaseUrl = conf.databaseUrl;

// connect to DB
mongoose.connect(databaseUrl);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(
  path.join(__dirname+'/../front-end/ui')
));

// setup the server port number
var port = process.env.PORT || conf.devport;

// we are using Express router for routing between APIs
var router = express.Router();

// all of our APIs are prefixed with "jabeja/api"
// Example: http://jabeja.com/jabeja/api/
app.use('/jabeja/api', router);

router.route('/trip')

  /**
  * @api {post} /jabeja/api/trip Post a trip information
  * @apiName addTrip
  * @apiGroup Trip
  *
  * @apiParam {String} userId User unique ID by Facebook.
  * @apiParam {String} userImg User image URL by Facebook.
  * @apiParam {String} name User name by Facebook.
  * @apiParam {String} email User's email.
  * @apiParam {Number} rate User's rate.
  * @apiParam {String} deliveryType Type of delivery, documnet, money, both.
  * @apiParam {String} source Trip's source.
  * @apiParam {String} dest Trip's destination.
  * @apiParam {String} finishDate Trip's date.
  * @apiSuccess {json} message success.
  * @apiSuccess {json} message duplicate.
  * @apiFailure {json} message wrong parameter - (delivery type)
  */
  .post(function(req, res) {
    console.log("TRIP IS", req.body);
    var trip = new Trip();
    trip.userId = req.body.userId;
    trip.userImg = req.body.userImg;
    trip.name = req.body.name;
    trip.email = req.body.email;
    trip.rate = req.body.rate;
    trip.deliveryType = req.body.deliveryType;
    trip.source = req.body.source;
    trip.dest = req.body.dest;
    trip.finishDate = req.body.finishDate;

    var deliveryType = trip.deliveryType.toLowerCase();
    if (deliveryType != "money" &&
        deliveryType != "document" &&
        deliveryType != "both") {
      res.json({message : 'wrong parameter - (delivery type)'});
    }

    // check if there is a duplicate record already
    Trip.count({userId: trip.userId, userImg: trip.userImg,
      name : trip.name, email : trip.email,
      deliveryType : trip.deliveryType, source : trip.source,
      dest : trip.dest, finishDate : trip.finishDate},
      function(err, c) {
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
                  res.json({message: 'success.'});
            });
          }
        }
      });
  })

  /**
  * @api {get} /jabeja/api/trip Get all trips.
  * @apiName getTrips
  * @apiGroup Trip
  *
  * @apiSuccess {json} trips object contains array of trips.
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
  * @apiParam {String} userImg User image URL by Facebook.
  * @apiParam {String} name User name by Facebook.
  * @apiParam {String} email User's email.
  * @apiParam {Number} rate User's rate.
  * @apiParam {String} deliveryType Type of delivery, documnet, money, both.
  * @apiParam {String} source Trip's source.
  * @apiParam {String} dest Trip's destination.
  * @apiParam {String} finishDate Trip's date.
  * @apiSuccess {json} message success.
  */
  .delete(function(req, res) {
    Trip.remove({userId: req.params.userId, userImg: req.params.userImg,
      name : req.params.name, email : req.params.email,
      deliveryType : req.params.deliveryType, source : req.params.source,
      dest : req.params.dest, finishDate : req.params.finishDate},
    function(err) {
      if (err)
        res.send(err);
      else res.json({message: 'success'});
    });
  });

/**
* @api {delete} /jabeja/api/search/:type/:source/:destination Searcb trips.
* @apiName searchTrips
* @apiGroup Search
*
* @apiParam {String} type Type of delivery, documnet, money, both.
* @apiParam {String} source Trip's source.
* @apiParam {String} destination Trip's destination.
* @apiSuccess {json} trips object contains array of trips.
*/
router.route('/trip/search/:type/:source/:destination')
  .get(function(req, res) {
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
  * @apiParam {String} img User image URL by Facebook.
  * @apiParam {String} name User name by Facebook.
  * @apiParam {String} email User's email.
  * @apiParam {Number} phone User's phone.
  * @apiParam {Number} rate User's rate.
  *
  * @apiSuccess {json} message success.
  * @apiFailure {json} message already exists.
  */
  .post(function(req, res) {
    var user = new User();
    user.userId = req.body.fbId;
    user.name = req.body.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.rate = req.body.rate;
    user.img = req.body.img;
    User.count({name : user.name, userId : user.userId,
      email : user.email, phone : user.email,
      rate : user.rate, img: user.img}, function(err, c) {
        if (c !== 0) res.json({message: 'already exists.'});
        else {
          user.save(function(err) {
              if (err)
                res.send(err);
              else
                res.json({message: 'success.'});
          });
        }
      });
  })

  /**
  * @api {get} /jabeja/api/user Get a user.
  * @apiName getUser
  * @apiGroup User
  *
  * @apiParam {String} id User unique ID by Facebook.
  *
  * @apiSuccess {json} message Object contains name and img.
  * @apiFailure {json} message user doesn't exists.
  */
  .get(function(req, res) {
    var id = req.query.id;
    User.findOne({userId: id}, function(err, user) {
      console.log(id, user)
      if (err) console.log("user doesn't exist.");
      else {
        res.json({name: user.name, img: user.img});
      }
    });
  });

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
