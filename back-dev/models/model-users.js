'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * user model file
 */

var usersSchema = new Schema({
    email: 'String',
    firstName: 'String',
    middleName: 'String',
    lastName: 'String',
    phone: 'String',
    userFbId: 'String'
});

module.exports = mongoose.model('users', usersSchema);
