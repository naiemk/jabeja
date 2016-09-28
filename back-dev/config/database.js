'use strict';

var config = {};
config.dbUser = '';
config.dbPass = '';
config.databaseUrl = 'mongodb://' + config.dbUser + ':' + config.dbPass ;
config.devDatabaseUrl = 'mongodb://localhost/jabeja2';
module.exports = config
