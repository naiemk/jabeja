'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * trip model file
 */

var TripSchema = new Schema({
    userFbId: 'String',
    userName: 'String',
    userEmail: 'String',
    userPhone: 'String',
    deliveryType: [],
    source: 'String',
    dest: 'String',
    travelDate: 'Date',
    comment: 'String',
    serviceCharge: 'Number'
});

module.exports = mongoose.model('trips', TripSchema);
