'use strict'

var express = require('express');
var SongController = require('../controllers/song');
var middlewareAuth = require('../middlewares/authenticated');
//Maneja la utilizacion de archivos (files)
var multipart = require('connect-multiparty');
//Utilizado para guardar la imagen en el servidor (carpeta /uploads/users)
var middlewareUpload = multipart({uploadDir: './uploads/song'});

var expressRouter = express.Router();

expressRouter.get('/song/:id', middlewareAuth.ensureAuth, SongController.getSong);
expressRouter.get('/songs/:album?', middlewareAuth.ensureAuth, SongController.getSongs);
expressRouter.post('/song/save', middlewareAuth.ensureAuth, SongController.saveSong);
expressRouter.put('/song/update/:id', middlewareAuth.ensureAuth, SongController.updateSong);
expressRouter.delete('/song/delete/:id', middlewareAuth.ensureAuth, SongController.deleteSong);
expressRouter.post('/song/upload-file/:id', [middlewareAuth.ensureAuth, middlewareUpload], SongController.uploadSongFile);
expressRouter.get('/song/get-file/:songFile', SongController.getSongFile);

module.exports = expressRouter;