var app = express(),
    conf = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    User = require('./models/user'),
    Trip = require('./models/trip');
    path = require('path');
    databaseUrl = 'localhost:27017/jabeja',

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
    trip.save(function(err) {
        if (err)
          res.send(err);
        else
          res.json({message: 'Success.'});
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
  });

// Route API
// router.route('user')
//   .get(function(req, res) {})
//   .post(function(req, res) {});

// all of our APIs are prefixed with "jabeja/api"
// Example: http://jabeja.com/jabeja/api/getuser
app.use('/jabeja/api', router);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname+'/../front-end/index.html'));
});

app.listen(port);
console.log("Server is running on port: " + port);
