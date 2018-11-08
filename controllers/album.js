'use strict'

var fileSystem = require('fs');
var path = require('path');
var mongoosePaginate = require('mongoose-pagination');

// var Artist = require('../models/artist');
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

function getAlbums(req, res){
    var page;
    (req.params.page) ? page = req.params.page : page = 1;

    var itemsPerPage = 3;    

    Album.find().sort('id').paginate(page, itemsPerPage, (err, albums, total) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        } else{
            if(!albums){
                res.status(404).send({message: 'No hay albums'});
            } else{
                res.status(200).send({
                    itemsTotal: total,
                    albums
                });
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
            res.status(200).send({
                message: 'Album guardado', 
                albumStored
            });
        }
    });
}

function updateAlbum(req, res){
    var albumId = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
        if(err){
            res.status(500).send({message:'Error al actualizar album'});
        } else{
            res.status(200).send({
                message:'Album actualizado correctamente', 
                album: albumUpdated
            });
        }
    }); 
}

function deleteAlbum(req, res){
    var albumId = req.params.id;

    Album.findByIdAndRemove(albumId, (err, albumRemoved) => {
        if(err){
            res.status(500).send({message:'Error al eliminar album'});
        } else{
            Song.find({album: albumRemoved.id}).remove((err, songRemoved) => {
                if(err){
                    res.status(500).send({message:'Error al eliminar cancion'});
                } else{
                    res.status(200).send({
                        message:'Album eliminado correctamente', 
                        albumRemoved
                    });
                }
            });
        }
    });
}

function uploadImage(req, res){
    var albumId = req.params.id;
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
            Album.findByIdAndUpdate(albumId, {image: fileName}, (err, albumUpdated) => {
                if(err){
                    res.status(500).send({message:'Error al actualizar album'});
                } else{
                    res.status(200).send({
                        message:'Album actualizado correctamente', 
                        albumUpdated
                    });
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
    var pathFile = './uploads/album/' + imageFile;

    fileSystem.exists(pathFile, (exists) => {
        if(exists){
            res.sendFile(path.resolve(pathFile));
        } else{
            res.status(200).send({message:'No existe la imagen...'});
        }
    });
}

module.exports = {
    getAlbum,
    getAlbums,
    saveAlbum,
    updateAlbum,
    deleteAlbum,
    uploadImage,
    getImageFile
};