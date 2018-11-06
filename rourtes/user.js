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
api.post('/user/register', UserController.saveUser);
api.post('/login', UserController.login);
api.put('/user/update/:id', middlewareAuth.ensureAuth, UserController.updateUser);
api.post('/user/upload-image/:id', [middlewareAuth.ensureAuth, middlewareUpload], UserController.uploadImage);
api.get('/user/get-image/:imageFile', UserController.getImageFile);
 
module.exports = api;