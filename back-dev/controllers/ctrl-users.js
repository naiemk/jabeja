'use strict';

var users = require('express').Router(),
    Model = require('../models/model-users.js');

users.get('/', function(req, res) {
    Model.find(function(err, users){
        if (req.accepts('html', 'json') === 'json') {
            if(err) {
                return res.json(500, {
                    message: 'Error getting users.'
                });
            }
            return res.json(users);
        } else {
            if(err) {
                return res.send('500: Internal Server Error', 500);
            }
        return res.render('users/index', {users: users});
        }
    });
});

users.post('/', function(req, res) {
    var user = new Model({
        'email': req.body['email'],
        'firstName': req.body['firstName'],
        'lastName': req.body['lastName'],
        'phone': req.body['phone'],
        'userFbId': req.body['userFbId'],
        // TODO: generate Date parser.
    });
    user.save(function(err, user){
        if (req.accepts('html', 'json') === 'json') {
            if(err) {
                return res.json(500, {
                    message: 'Error saving item.',
                    error: err
                });
            }
            return res.json({
                message: 'saved',
                _id: user._id
            });
        } else {
            if(err) {
                return res.send('500: Internal Server Error', 500);
            }
            return res.render('users/edit', {user: user});
        }
    });
});

users.get('/:id', function(req, res) {
    var id = req.params.id;
    Model.findOne({_id: id}, function(err, user){
        if (req.accepts('html', 'json') === 'json') {
            if(err) {
                return res.json(500, {
                    message: 'Error getting user.'
                });
            }
            if(!user) {
                return res.json(404, {
                    message: 'No such user.'
                });
            }
            return res.json(user);
        } else {
            if(err) {
                return res.send('500: Internal Server Error', 500);
            }
            if(!user) {
                return res.end('No such user');
            }
            return res.render('users/edit', {user: user, flash: 'Created.'});
        }
    });
});

users.put('/:id', function(req, res) {
    var id = req.params.id;
    Model.findOne({_id: id}, function(err, user){
        if (req.accepts('html', 'json') === 'json') {
            if(err) {
                return res.json(500, {
                    message: 'Error saving user',
                    error: err
                });
            }
            if(!user) {
                return res.json(404, {
                    message: 'No such user'
                });
            }
            user['email'] = req.body['email'] ? req.body['email'] : user['email'];
            user['firstName'] = req.body['firstName'] ? req.body['firstName'] : user['firstName'];
            user['lastName'] = req.body['lastName'] ? req.body['lastName'] : user['lastName'];
            user['phone'] = req.body['phone'] ? req.body['phone'] : user['phone'];
            user['userFbId'] = req.body['userFbId'] ? req.body['userFbId'] : user['userFbId'];
            // TODO: generate Date parser.
            user.save(function(err, user){
                if(err) {
                    return res.json(500, {
                        message: 'Error getting user.'
                    });
                }
                if(!user) {
                    return res.json(404, {
                        message: 'No such user'
                    });
                }
                return res.json(user);
            });
        } else {
            if(err) {
                return res.send('500: Internal Server Error', 500);
            }
            if(!user) {
                return res.end('No such user');
            }
            user['email'] = req.body['email'] ? req.body['email'] : user['email'];
            user['firstName'] = req.body['firstName'] ? req.body['firstName'] : user['firstName'];
            user['lastName'] = req.body['lastName'] ? req.body['lastName'] : user['lastName'];
            user['phone'] = req.body['phone'] ? req.body['phone'] : user['phone'];
            user['userFbId'] = req.body['userFbId'] ? req.body['userFbId'] : user['userFbId'];
            // TODO: generate Date parser.
            user.save(function(err, user){
                if(err) {
                    return res.send('500: Internal Server Error', 500);
                }
                if(!user) {
                    return res.end('No such user');
                }
                return res.render('users/edit', {user: user, flash: 'Saved.'});
            });
        }
    });
});

users.delete('/:id', function(req, res) {
    var id = req.params.id;
    Model.findOne({_id: id}, function(err, user){
        if (req.accepts('html', 'json') === 'json') {
            if(err) {
                return res.json(500, {
                    message: 'Error getting user.'
                });
            }
            if(!user) {
                return res.json(404, {
                    message: 'No such user'
                });
            }
            return res.json(user);
        } else {
            if(err) {
                return res.send('500: Internal Server Error', 500);
            }
            if(!user) {
                return res.end('No such user');
            }
            return res.render('index', {flash: 'Item deleted.'});
        }
    });
});

module.exports.users = users;
