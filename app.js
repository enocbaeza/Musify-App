'use strict'

var express = require('express');
var bodyParser = require('body-parser');

//Se crea objeto de express
var app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

module.exports = app;