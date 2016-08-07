var express = require('express'),
    app = express(),
    conf = require('./config'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path');
    User = require('./models/user'),
    Trip = require('./models/trip');

var app = express();
var databaseUrl = 'localhost:27017/jabeja';

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
router.route('/user0') // I also added user, commenting this out for now

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

// Route API
// router.route('user')
//   .get(function(req, res) {})
//   .post(function(req, res) {});

// all of our APIs are prefixed with "jabeja/api"
// Example: http://jabeja.com/jabeja/api/getuser
app.use('/jabeja/api', router);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/../front-end/ui/index.html'));
});

app.get('/login', function(req, res) {
  res.sendFile(path.join(__dirname+'/../front-end/ui/login.html'));
});

app.findUser = function(userId, callBack) {
  console.log("GETTING", userId)
  console.log('cb', callBack);
  User.findOne( { id: userId }, function(err, user) {
    console.log(err, user)
    if (!err) {
      callBack(user);
    };
  });
}

app.get('/updateUser', function(req, res) {
  app.findUser(req.query.id, function(userBack) {
    var user = userBack || new User();
    user.id = req.query.id;
    user.img = req.query.img;
    user.fbId = req.query.userId;
    user.name = req.query.name;
    user.save(function err(err) {
      if (err) {
        console.log("Error saving user", user, err);
        res.send(err);
      } else {
        console.log("User saved", user);
        res.json({message: 'Success.'});
      }
    });
  });
});

app.get('/user', function(req, res) {
  var userId = req.query.userId;
  app.findUser(userId, function(user) {
    if (user && user.name) {
      res.json({name: user.name, img: user.img});
    }
  })
});

app.listen(port);
console.log("Server is running on port: " + port);
