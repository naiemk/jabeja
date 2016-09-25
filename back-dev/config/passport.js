var JwtStrategy = require('passport-jwt').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    User = require('../models/model-users'),
    jwt = require('jwt-simple'),
    config = require('../config/auth');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
      done(null, user.id)
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  })

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

  passport.use(new FacebookStrategy({
      clientID: config.facebookAuth.clientID,
      clientSecret: config.facebookAuth.clientSecret,
      callbackURL: config.facebookAuth.callbackURL,
      profileFields: ['id', 'email', 'first_name', 'last_name']
    }, function(token, refreshToken, profile, done) {
      process.nextTick(function() {
        User.findOne({ 'facebookId': profile.id }, function(err, user) {
          if (err)
            return done(err);
          if (user) {
            user.jwtToken = 'JWT ' + jwt.encode(user, config.jwt.secret);
            return done(null, user);
          } else {
            var newUser = new User();
            newUser.facebookId = profile.id;
            newUser.facebookToken = token;
            newUser.firstName = profile.name.givenName;
            newUser.lastName = profile.name.familyName;
            newUser.email = (profile.emails[0].value || '').toLowerCase();
            newUser.password = newUser.facebookId + newUser.facebookToken;
            newUser.save(function(err) {
              if (err)
                throw err;
              else {
                newUser.jwtToken = 'JWT ' + jwt.encode(user, config.jwt.secret);
                return done(null, newUser);
              }
            });
          }
        });
      });
  }));
};
