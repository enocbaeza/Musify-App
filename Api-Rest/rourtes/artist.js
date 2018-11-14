'use strict'

var express = require('express');
var ArtistController = require('../controllers/artist');
var middlewareAuth = require('../middlewares/authenticated');
//Maneja la utilizacioon de archivos (files)
var multipart = require('connect-multiparty');
//Utilizado para guardar la imagen en el servidor (carpeta /uploads/users)
var middlewareUpload = multipart({uploadDir: './uploads/artist'});

var expressRouter = express.Router();

expressRouter.get('/artist/:id', middlewareAuth.ensureAuth, ArtistController.getArtist);
expressRouter.post('/artist/save', ArtistController.saveArtist);
//El signo de interrogacion hacen al parametro "page" opcional en la request
expressRouter.get('/artists/:page?', middlewareAuth.ensureAuth, ArtistController.getArtists);
expressRouter.put('/artist/update/:id', middlewareAuth.ensureAuth, ArtistController.updateArtist);
expressRouter.delete('/artist/delete/:id', middlewareAuth.ensureAuth, ArtistController.deleteArtist);
expressRouter.post('/artist/upload-image/:id', [middlewareAuth.ensureAuth, middlewareUpload], ArtistController.uploadImage);
expressRouter.get('/artist/get-image/:imageFile', ArtistController.getImageFile);
 
module.exports = expressRouter;