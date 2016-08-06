var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  id : String,
  name : String,
  fbId: String,
  email : String,
  phone : String,
  rate : Number
});

module.exports = mongoose.model("User", UserSchema)
