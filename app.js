'use strict'

var express = require('express');
var bodyParser = require('body-parser');

//Se crea objeto de express
var app = express();

//Cargar rutas
var userRoutes = require('./rourtes/user');
var artistRoutes = require('./rourtes/artist');
var albumRoutes = require('./rourtes/album');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configurar cabeceras http

//Rutas base
app.use('/api', userRoutes);
app.use('/api', artistRoutes);
app.use('/api', albumRoutes);

module.exports = app;