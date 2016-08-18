var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TripSchema = new Schema({
  userId: String,
  userFullName: String,
  email : String,
  phone: String,
  deliveryType: String, //money , document, both
  source: String,
  dest: String,
  travelDate: Date,
  comment: String
});

module.exports = mongoose.model('Trip', TripSchema)
