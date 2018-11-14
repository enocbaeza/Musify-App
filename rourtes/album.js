'use strict'

var express = require('express');
var AlbumController = require('../controllers/album');
var middlewareAuth = require('../middlewares/authenticated');
//Maneja la utilizacion de archivos (files)
var multipart = require('connect-multiparty');
//Utilizado para guardar la imagen en el servidor (carpeta /uploads/users)
var middlewareUpload = multipart({uploadDir: './uploads/album'});

var expressRouter = express.Router();

expressRouter.get('/album/:id', middlewareAuth.ensureAuth, AlbumController.getAlbum);
expressRouter.get('/albums/:artist?', middlewareAuth.ensureAuth, AlbumController.getAlbums);
expressRouter.post('/album/save', middlewareAuth.ensureAuth, AlbumController.saveAlbum);
expressRouter.put('/album/update/:id', middlewareAuth.ensureAuth, AlbumController.updateAlbum);
expressRouter.delete('/album/delete/:id', middlewareAuth.ensureAuth, AlbumController.deleteAlbum);
expressRouter.post('/album/upload-image/:id', [middlewareAuth.ensureAuth, middlewareUpload], AlbumController.uploadImage);
expressRouter.get('/album/get-image/:imageFile', AlbumController.getImageFile);

module.exports = expressRouter;