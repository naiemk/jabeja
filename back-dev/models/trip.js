var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TripSchema = new Schema({
  id: String,
  name: String,
  email : String,
  rate : Number,
  deliveryType: Boolean, //0 => Money, 1 => Document
  source: String,
  dest: String,
  finishDate: Date
});

module.exports = mongoose.model('Trip', TripSchema)
