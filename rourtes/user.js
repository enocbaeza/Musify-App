'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var middlewareAuth = require('../middlewares/authenticated');
//Maneja la utilizacioon de archivos (files)
var multipart = require('connect-multiparty');
//Utilizado para guardar la imagen en el servidor (carpeta /uploads/users)
var middlewareUpload = multipart({uploadDir: './uploads/users'});

var api = express.Router();


api.get('/test', middlewareAuth.ensureAuth, UserController.prueba);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.login);
api.put('/update-user/:id', middlewareAuth.ensureAuth, UserController.updateUser);
api.post('/upload-image/:id', [middlewareAuth.ensureAuth, middlewareUpload], UserController.uploadImage);
api.get('/get-image/:imageFile', UserController.getImageFile);
 
module.exports = api;