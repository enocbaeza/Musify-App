'use strict'

var express = require('express');
var ArtistController = require('../controllers/artist');
var middlewareAuth = require('../middlewares/authenticated');
//Maneja la utilizacioon de archivos (files)
var multipart = require('connect-multiparty');
//Utilizado para guardar la imagen en el servidor (carpeta /uploads/users)
var middlewareUpload = multipart({uploadDir: './uploads/artist'});

var api = express.Router();

api.get('/artist/:id', middlewareAuth.ensureAuth, ArtistController.getArtist);
api.post('/artist/save', ArtistController.saveArtist);
//El signo de interrogacion hacen al parametro "page" opcional en la request
api.get('/artists/:page?', middlewareAuth.ensureAuth, ArtistController.getArtists);
api.put('/artist/update/:id', middlewareAuth.ensureAuth, ArtistController.updateArtist);
api.delete('/artist/delete/:id', middlewareAuth.ensureAuth, ArtistController.deleteArtist);
api.post('/artist/upload-image/:id', [middlewareAuth.ensureAuth, middlewareUpload], ArtistController.uploadImage);
api.get('/artist/get-image/:imageFile', ArtistController.getImageFile);
 
module.exports = api;