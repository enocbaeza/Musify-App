'use strict'

var fileSystem = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');

// var Artist = require('../models/artist');
var Song = require('../models/album'); 
var Song = require('../models/song');

function getSong(req, res){
    var songId = req.params.id;
    //Metodo populate va a buscar los datos del artista y los carga en objeto
    Song.findById(songId).populate({path: 'album'}).exec((err, song) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        } else{
            if(!song){
                res.status(404).send({message: 'Cancion no existe'});
            } else{
                res.status(200).send({song});
            }            
        } 
    });
} 

function getSongs(req, res){
    var artistId = req.params.artist;
    var albumId = req.params.album;

    if(!albumId){
        var find = Song.find({}).sort('name');
    } else {
        var find = Song.find({album: albumId}).sort('number');
    }

    find.populate({path: 'album'}).exec((err, songs) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        } else{
            if(!songs){
                res.status(404).send({message: 'No hay canciones'});
            } else{
                res.status(200).send({songs});
            }            
        }
    });
}

function saveSong(req, res){
    var song = new Song();

    var params = req.body;
    song.number = params.number;
    song.name = params.name;
    song.duration = params.duration;
    song.file = 'NULL';
    song.album = params.album;

    song.save((err, songStored) => { 
        if(err){
            res.status(500).send({message: 'Error al guardar cancion'});
        } else{
            res.status(200).send({
                message: 'Cancion guardada', 
                songStored
            });
        }
    });
}

function updateSong(req, res){
    var songId = req.params.id;
    var update = req.body;

    Song.findByIdAndUpdate(songId, update, (err, songUpdated) => {
        if(err){
            res.status(500).send({message:'Error al actualizar cancion'});
        } else{
            if(!songUpdated){
                res.status(404).send({message: 'Cancion no existe'});
            } else{
                res.status(200).send({
                    message:'Cancion actualizada correctamente', 
                    songUpdated
                });
            }
        }
    }); 
}

function deleteSong(req, res){
    var songId = req.params.id;

    Song.findByIdAndRemove(songId, (err, songRemoved) => {
        if(err){
            res.status(500).send({message:'Error al eliminar cancion'});
        } else{
            if(!songRemoved){
                res.status(404).send({message: 'Cancion no existe'});
            } else{
                res.status(200).send({
                    message:'Cancion eliminada correctamente', 
                    songRemoved
                });
            }
        }
    });
}

function uploadSongFile(req, res){
    var songId = req.params.id;
    var fileName = 'No subido...';
    
    if(req.files){
        //Sube archivo de audio al servidor
        var filePath = req.files.file.path;
        var fileSplit = filePath.split('/');
        var fileName = fileSplit[2];
        var extSplit = fileName.split('.');
        var fileExt = extSplit[1].toLocaleLowerCase();

        if(fileExt == 'mp3' || fileExt == 'wav' || fileExt == 'ogg'){
            //Guardar imagen en la BD
            Song.findByIdAndUpdate(songId, {file: fileName}, (err, songUpdated) => {
                if(err){
                    res.status(500).send({message:'Error al actualizar cancion'});
                } else{
                    if(!songUpdated){
                        res.status(404).send({message: 'Cancion no existe'});
                    } else{
                        res.status(200).send({
                            message:'Cancion actualizada correctamente', 
                            songUpdated
                        });
                    }
                }
            });
        } else{
            res.status(200).send({message:'Extension del archivo no valida'});
        }
        console.log(filePath);
    } else{
        res.status(200).send({message:'No has subido ningun archivo de audio...'});
    }
}

function getSongFile(req, res){
    var songFile = req.params.songFile;
    var pathFile = './uploads/song/' + songFile;

    fileSystem.exists(pathFile, (exists) => {
        if(exists){
            res.sendFile(path.resolve(pathFile));
        } else{
            res.status(200).send({message:'No existe el archivo de audio...'});
        }
    });
}

module.exports = {
    getSong,
    getSongs,
    saveSong,
    updateSong,
    deleteSong,
    uploadSongFile,
    getSongFile
};