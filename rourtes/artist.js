'use strict'

var express = require('express');
var ArtistController = require('../controllers/artist');
var middlewareAuth = require('../middlewares/authenticated');

var api = express.Router();

api.get('/artist/:id', middlewareAuth.ensureAuth, ArtistController.getArtist);
api.post('/save-artist', ArtistController.saveArtist);
//El signo de interrogacion hacen al parametro "page" opcional en la request
api.get('/artists/:page?', middlewareAuth.ensureAuth, ArtistController.getArtists);
api.put('/update-artist/:id', middlewareAuth.ensureAuth, ArtistController.updateArtist);
api.delete('/delete-artist/:id', middlewareAuth.ensureAuth, ArtistController.deleteArtist);
 
module.exports = api;