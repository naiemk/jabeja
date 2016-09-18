var JwtStrategy = require('passport-jwt').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    User = require('../models/model-users'),
    config = require('../config/auth');

module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = config.jwt.secret;

  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.id}, function(err, user) {
      if (err) return done(err, false);
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};
