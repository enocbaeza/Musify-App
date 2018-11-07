'use strict'

var fileSystem = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getAlbum(req, res){
    var albumId = req.params.id;

    Album.findById(albumId, (err, album) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        } else{
            if(!album){
                res.status(404).send({message: 'Album no existe'});
            } else{
                res.status(200).send({album});
            }            
        }
    });
}

function saveAlbum(req, res){
    var album = new Album();

    var params = req.body;
    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = 'NULL';
    album.artist = params.artist;

    album.save((err, albumStored) => { 
        if(err){
            res.status(500).send({message: 'Error al guardar album'});
        } else{
            res.status(200).send({message: 'Album guardado', artist: albumStored});            
        }
    });
}

module.exports = {
    getAlbum,
    saveAlbum
};