var express = require('express'),
    app = express(),
    conf = require('./config'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    User = require('./models/user'),
    Trip = require('./models/trip');
    path = require('path');
    databaseUrl = 'localhost:27017/jabeja',

// connect to DB
mongoose.connect(databaseUrl);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// setup the server port number
var port = process.env.PORT || conf.devport;

// we are using Express router for routing between APIs
var router = express.Router();

// Trip API
router.route('/trip')
  .post(function(req, res) {
    var trip = new Trip();
    trip.name = req.body.name;
    trip.email = req.body.email;
    trip.rate = req.body.rate;
    trip.deliveryType = req.body.deliveryType;
    trip.source = req.body.source;
    trip.dest = req.body.dest;
    trip.finishDate = req.body.finishDate;

    // check if there is a duplicate record already
    Trip.count({name : trip.name, email : trip.email,
      deliveryType : trip.deliveryType, source : trip.source,
      dest : trip.dest, finishDate : trip.finishDate},
      function(err, c) {
        if (err)
          res.send(err);
        else {
          //same record already exists.
          if (c !== 0) res.json({message: 'duplicate'});
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

  // get all trips
  .get(function(req, res) {
    Trip.find(function(err, trips) {
      if (err)
        res.send(err);
      else
        res.json(trips);
    });
  })

  // delete a trip
  .delete(function(req, res) {
    Trip.remove({name : req.params.name, email : req.params.email,
      deliveryType : req.params.deliveryType, source : req.params.source,
      dest : req.params.dest, finishDate : req.params.finishDate},
    function(err) {
      if (err)
        res.send(err);
      else res.json({message: 'success'});
    });
  });

// search API
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
router.route('/user')

  // adding a user
  .post(function(req, res) {
    var user = new User();
    user.name = req.body.name;
    user.fbId = req.body.fbId;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.rate = req.body.rate;

    User.count({name : user.name, fbId : user.fbId,
      email : user.email, phone : user.email,
      rate : user.rate}, function(err, c) {
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
  });

// all of our APIs are prefixed with "jabeja/api"
// Example: http://jabeja.com/jabeja/api/getuser
app.use('/jabeja/api', router);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/../front-end/index.html'));
});

app.listen(port);
console.log("Server is running on port: " + port);
