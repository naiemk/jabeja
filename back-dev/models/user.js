var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userId: String,
  name : String,
  email : String,
  phone : String,
  rate : Number,
  img : String
});

module.exports = mongoose.model("User", UserSchema)
