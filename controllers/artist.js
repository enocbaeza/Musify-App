'use strict'

var fileSystem = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getArtist(req, res){
    var artistId = req.params.id;

    Artist.findById(artistId, (err, artist) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        } else{
            if(!artist){
                res.status(404).send({message: 'Artista no existe'});
            } else{
                res.status(200).send({artist});
            }            
        }
    });
}

function saveArtist(req, res){
    var artist = new Artist();

    var params = req.body;
    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'NULL';

    artist.save((err, artistStored) => { 
        if(err){
            res.status(500).send({message: 'Error al guardar artista'});
        } else{
            res.status(200).send({message: 'Artista guardado', artist: artistStored});            
        }
    });
}

function getArtists(req, res){
    var page;
    (req.params.page) ? page = req.params.page : page = 1;

    var itemsPerPage = 3;    

    Artist.find().sort('name').paginate(page, itemsPerPage, (err, artists, total) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        } else{
            if(!artists){
                res.status(404).send({message: 'No hay artistas'});
            } else{
                res.status(200).send({
                    itemsTotal: total,
                    artists: artists
                });
            }            
        }
    });
}

function updateArtist(req, res){
    var artistId = req.params.id;
    var update = req.body;

    Artist.findByIdAndUpdate(artistId, update, (err, artistUpdated) => {
        if(err){
            res.status(500).send({message:'Error al actualizar artista'});
        } else{
            res.status(200).send({
                message:'Artista actualizado correctamente', 
                artist: artistUpdated
            });
        }
    }); 
}

function deleteArtist(req, res){
    var artistId = req.params.id;

    Artist.findByIdAndRemove(artistId, (err, artistRemoved) => {
        if(err){
            res.status(500).send({message:'Error al eliminar artista'});
        } else{
            Album.find({artist: artistRemoved.id}).remove((err, albumRemoved) => {
                if(err){
                    res.status(500).send({message:'Error al eliminar album'});
                } else{
                    Song.find({artist: albumRemoved.id}).remove((err, songRemoved) => {
                        if(err){
                            res.status(500).send({message:'Error al eliminar cancion'});
                        } else{
                            res.status(200).send({
                                message:'Artista eliminado correctamente', 
                                artistRemoved: artistRemoved
                            });
                        }
                    });
                }
            });
        }
    });
}

function uploadImage(req, res){
    var artistId = req.params.id;
    var fileName = 'No subido...';
    
    if(req.files){
        //Sube imagen al servidor
        var filePath = req.files.image.path;
        var fileSplit = filePath.split('/');
        var fileName = fileSplit[2];
        var extSplit = fileName.split('.');
        var fileExt = extSplit[1].toLocaleLowerCase();

        if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'gif'){
            //Guardar imagen en la BD
            Artist.findByIdAndUpdate(artistId, {image: fileName}, (err, artistUpdated) => {
                if(err){
                    res.status(500).send({message:'Error al actualizar artista'});
                } else{
                    res.status(200).send({message:'Artista actualizado correctamente', artist: artistUpdated});
                }
            });
        } else{
            res.status(200).send({message:'Extension del archivo no valida'});
        }
        console.log(filePath);
    } else{
        res.status(200).send({message:'No has subido ninguna imagen...'});
    }
}

function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var pathFile = './uploads/artist/' + imageFile;

    fileSystem.exists(pathFile, (exists) => {
        if(exists){
            res.sendFile(path.resolve(pathFile));
        } else{
            res.status(200).send({message:'No existe la imagen...'});
        }
    });
}

module.exports = {
    getArtist, 
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist,
    uploadImage,
    getImageFile
};