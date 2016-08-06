var conf = require('./config'),
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// setup the server port number
var port = process.env.PORT || conf.devport;

// we are using Express router for routing between APIs
var router = express.Router();

router.get('/', function(req, res) {
  res.json({message: "Test Repsonse."});
});

// all of our APIs are prefixed with "jabeja/api"
// Example: http://jabeja.com/jabeja/api/getuser
app.use('jabeja/api', router);

app.listen(port);
console.log("Server is running on port: " + port);
