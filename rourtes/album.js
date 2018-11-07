'use strict'

var express = require('express');
var AlbumController = require('../controllers/album');
var middlewareAuth = require('../middlewares/authenticated');
//Maneja la utilizacioon de archivos (files)
var multipart = require('connect-multiparty');
//Utilizado para guardar la imagen en el servidor (carpeta /uploads/users)
var middlewareUpload = multipart({uploadDir: './uploads/album'});

var api = express.Router();

api.get('/album/:id', middlewareAuth.ensureAuth, AlbumController.getAlbum);
api.post('/album/save', AlbumController.saveAlbum);