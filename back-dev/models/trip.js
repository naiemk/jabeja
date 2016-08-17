var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TripSchema = new Schema({
  userId: String,
  userImg: String,
  name: String,
  email : String,
  rate : Number,
  deliveryType: String, //money , document, both
  source: String,
  dest: String,
  finishDate: Date
});

module.exports = mongoose.model('Trip', TripSchema)
