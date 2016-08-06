var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TripSchema = new Schema({
  name: String,
  email : String,
  rate : number,
  deliveryType: boolean, //0 => Money, 1 => Document
  source: String,
  dest: String,
  finishDate: Date
});

module.exports = mongoose.model('Trip', TripSchema)
