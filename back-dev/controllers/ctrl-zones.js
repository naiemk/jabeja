'use strict';

var zones = require('express').Router(),
    Model = require('../models/model-zones.js');

zones.get('/', function(req, res) {
    Model.find(function(err, zones){
        if (req.accepts('html', 'json') === 'json') {
            if(err) {
                return res.json(500, {
                    message: 'Error getting zones.'
                });
            }
            return res.json(zones);
        } else {
            if(err) {
                return res.send('500: Internal Server Error', 500);
            }
        return res.render('zones/index', {zones: zones});
        }
    });
});

zones.post('/', function(req, res) {
    var zone = new Model({
        'zoneId': req.body['zoneId'],
        'title_en': req.body['title_en'],
        'title_fa': req.body['title_fa'],
        'location_en': req.body['location_en'],
        'location_fa': req.body['location_fa']
    });
    zone.save(function(err, zone){
        if (req.accepts('html', 'json') === 'json') {
            if(err) {
                return res.json(500, {
                    message: 'Error saving item.',
                    error: err
                });
            }
            return res.json({
                message: 'saved',
                _id: zone._id
            });
        } else {
            if(err) {
                return res.send('500: Internal Server Error', 500);
            }
            return res.render('zones/edit', {zone: zone});
        }
    });
});

zones.get('/:id', function(req, res) {
    var id = req.params.id;
    Model.findOne({_id: id}, function(err, zone){
        if (req.accepts('html', 'json') === 'json') {
            if(err) {
                return res.json(500, {
                    message: 'Error getting zone.'
                });
            }
            if(!zone) {
                return res.json(404, {
                    message: 'No such zone.'
                });
            }
            return res.json(zone);
        } else {
            if(err) {
                return res.send('500: Internal Server Error', 500);
            }
            if(!zone) {
                return res.end('No such zone');
            }
            return res.render('zones/edit', {zone: zone, flash: 'Created.'});
        }
    });
});

zones.put('/:id', function(req, res) {
    var id = req.params.id;
    Model.findOne({_id: id}, function(err, zone){
        if (req.accepts('html', 'json') === 'json') {
            if(err) {
                return res.json(500, {
                    message: 'Error saving zone',
                    error: err
                });
            }
            if(!zone) {
                return res.json(404, {
                    message: 'No such zone'
                });
            }
            zone['zoneId'] = req.body['zoneId'] ? req.body['zoneId'] : zone['zoneId'];
            zone['title_en'] = req.body['title_en'] ? req.body['title_en'] : zone['title_en'];
            zone['title_fa'] = req.body['title_fa'] ? req.body['title_fa'] : zone['title_fa'];
            zone['location_en'] = req.body['location_en'] ? req.body['location_en'] : zone['location_en'];
            zone['location_fa'] = req.body['location_fa'] ? req.body['location_fa'] : zone['location_fa'];
            zone.save(function(err, zone){
                if(err) {
                    return res.json(500, {
                        message: 'Error getting zone.'
                    });
                }
                if(!zone) {
                    return res.json(404, {
                        message: 'No such zone'
                    });
                }
                return res.json(zone);
            });
        } else {
            if(err) {
                return res.send('500: Internal Server Error', 500);
            }
            if(!zone) {
                return res.end('No such zone');
            }
            zone['zoneId'] = req.body['zoneId'] ? req.body['zoneId'] : zone['zoneId'];
            zone['title_en'] = req.body['title_en'] ? req.body['title_en'] : zone['title_en'];
            zone['title_fa'] = req.body['title_fa'] ? req.body['title_fa'] : zone['title_fa'];
            zone['location_en'] = req.body['location_en'] ? req.body['location_en'] : zone['location_en'];
            zone['location_fa'] = req.body['location_fa'] ? req.body['location_fa'] : zone['location_fa'];
            zone.save(function(err, zone){
                if(err) {
                    return res.send('500: Internal Server Error', 500);
                }
                if(!zone) {
                    return res.end('No such zone');
                }
                return res.render('zones/edit', {zone: zone, flash: 'Saved.'});
            });
        }
    });
});

zones.delete('/:id', function(req, res) {
    var id = req.params.id;
    Model.findOne({_id: id}, function(err, zone){
        if (req.accepts('html', 'json') === 'json') {
            if(err) {
                return res.json(500, {
                    message: 'Error getting zone.'
                });
            }
            if(!zone) {
                return res.json(404, {
                    message: 'No such zone'
                });
            }
            return res.json(zone);
        } else {
            if(err) {
                return res.send('500: Internal Server Error', 500);
            }
            if(!zone) {
                return res.end('No such zone');
            }
            return res.render('index', {flash: 'Item deleted.'});
        }
    });
});

module.exports.zones = zones;
