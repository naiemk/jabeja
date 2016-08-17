var express = require('express'),
    app = express(),
    conf = require('./config'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path');
    User = require('./models/user'),
    Trip = require('./models/trip');

var app = express();
var databaseUrl = conf.databaseUrl;

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

// Trip API
router.route('/trip')
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
router.route('/user') // I also added user, commenting this out for now

  // adding a user
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
  // getting a user
  .get(function(req, res) {
    var id = req.query.id;
    User.findOne({userId: id}, function(err, user) {
      console.log(id, user)
      if (err) console.log("User doesn't exist.");
      else {
        res.json({name: user.name, img: user.img});
      }
    });
  });

// Route API
// router.route('user')
//   .get(function(req, res) {})
//   .post(function(req, res) {});

// all of our APIs are prefixed with "jabeja/api"
// Example: http://jabeja.com/jabeja/api/
app.use('/jabeja/api', router);

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
