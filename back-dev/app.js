'use strict'

var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    jwt = require('jwt-simple'),
    router = express.Router(),
    flash = require('connect-flash'),
    session = require('express-session'),
    authConfig = require('./config/auth'),
    databaseConfig =  require('./config/database');

var trip = require('./controllers/ctrl-trips');
var user = require('./controllers/ctrl-users');
var zone = require('./controllers/ctrl-zones');
var app = express();

// connect to DB
mongoose.connect(databaseConfig.devDatabaseUrl);


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//setting up the passport config
app.use(session({ secret: authConfig.jwt.secret }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
require('./config/passport')(passport);

//setting up routes
app.use('/jabeja/api/trip', trip);
app.use('/jabeja/api/user', user);
app.use('/jabeja/api/zone', zone);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(500);
  res.json({
    message: err.message,
    error: err
  });
});


module.exports = app;
