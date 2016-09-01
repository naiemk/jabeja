'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * zone model file
 */

var zonesSchema = new Schema({
    zoneId: 'String',
    title_en: 'String',
    title_fa: 'String',
    country_en: 'String',
    country_fa: 'String'
});

module.exports = mongoose.model('zones', zonesSchema);
