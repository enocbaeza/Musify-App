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
expressApp.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-Width, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Request-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    
    //Sirve para salir de este metodo y seguir con la ejecucion normal
    next();
});

//Rutas base
expressApp.use('/api', userRoutes);
expressApp.use('/api', artistRoutes);
expressApp.use('/api', albumRoutes);
expressApp.use('/api', songRoutes);

module.exports = expressApp;