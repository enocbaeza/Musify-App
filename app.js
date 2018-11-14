'use strict'

var express = require('express');
var bodyParser = require('body-parser');

//Se crea objeto de express
var expressApp = express();

//Cargar rutas
var userRoutes = require('./rourtes/user');
var artistRoutes = require('./rourtes/artist');
var albumRoutes = require('./rourtes/album');
var songRoutes = require('./rourtes/song');

expressApp.use(bodyParser.urlencoded({extended:false}));
expressApp.use(bodyParser.json());

//Configurar cabeceras http

//Rutas base
expressApp.use('/api', userRoutes);
expressApp.use('/api', artistRoutes);
expressApp.use('/api', albumRoutes);
expressApp.use('/api', songRoutes);

module.exports = expressApp;