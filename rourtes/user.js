'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var middlewareAuth = require('../middlewares/authenticated');

var api = express.Router();

api.get('/test', middlewareAuth.ensureAuth, UserController.prueba);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.login);

module.exports = api;