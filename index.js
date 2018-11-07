'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.port || 3977;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/musifydb', { useNewUrlParser: true }, (err, res) => {
    if(err){
        throw err;
    } else{
        console.log('Conexion exitosa a la BD!')

        app.listen(port, () => {
            console.log('Servidor Api rest disponible en http://localhost:' + port)
        });
    }
});