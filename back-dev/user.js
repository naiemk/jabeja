var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userId: String,
  firstName : String,
  lastName: String,
  email : String,
  phone : String
});

module.exports = mongoose.model("User", UserSchema)
