'use strict'

var express = require('express');
var bodyParser = require('body-parser');

//Se crea objeto de express
var app = express();

//Cargar rutas
var userRoutes = require('./rourtes/user');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configurar cabeceras http

//Rutas base
app.use('/api', userRoutes);

module.exports = app;