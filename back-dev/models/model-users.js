'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

/**
 * user model file
 */
var UserSchema = new Schema({
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    firstName: String,
    middleName: String,
    lastName: String,
    phone: String,
    facebookId: String,
    facebookToken: String
});

UserSchema.pre('save', function(next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
         if (err) {
             return next(err);
         }
         bcrypt.hash(user.password, salt, function (err, hash) {
             if (err) {
                 return next(err);
             }
             user.password = hash;
             next();
         });
     });
  } else {
      return next();
  }
});

UserSchema.methods.comparePassword = function(passw, callBackFunction) {
  bcrypt.compare(passw, this.password, function(err, isMatch) {
    if (err) {
      return callBackFunction(err);
    }
    callBackFunction(null, isMatch);
  });
};

module.exports = mongoose.model('user', UserSchema);
