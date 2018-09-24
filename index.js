'use strict'

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/musifydb', (err, res) => {
    if(err){
        throw err;
    } else{
        console.log('Conexion exitosa a la BD!')
    }
});