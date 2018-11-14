'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var middlewareAuth = require('../middlewares/authenticated');
//Maneja la utilizacioon de archivos (files)
var multipart = require('connect-multiparty');
//Utilizado para guardar la imagen en el servidor (carpeta /uploads/users)
var middlewareUpload = multipart({uploadDir: './uploads/users'});

var expressRouter = express.Router();

expressRouter.get('/test', middlewareAuth.ensureAuth, UserController.prueba);
expressRouter.post('/user/register', UserController.saveUser);
expressRouter.post('/login', UserController.login);
expressRouter.put('/user/update/:id', middlewareAuth.ensureAuth, UserController.updateUser);
expressRouter.post('/user/upload-image/:id', [middlewareAuth.ensureAuth, middlewareUpload], UserController.uploadImage);
expressRouter.get('/user/get-image/:imageFile', UserController.getImageFile);
 
module.exports = expressRouter;