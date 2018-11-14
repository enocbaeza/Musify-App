'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_enoc';

//Middleware se llamara antes de cualquier request http
//se encargara de validar la utenticacion del usuario para utilizar el api backend

//Valida token
exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message:'Request no tiene header de autorizacion'});
    }
    //quita las comillas del principio y el final del token
    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        var payload = jwt.decode(token, secret);

        if(payload.exp <= moment().unix()){
            return res.status(401).send({message:'Token ha expirado'});
        }
    } catch (error) {
        console.log(error);
        return res.status(404).send({message:'Token no valido'});
    }
    //creamos el objeto user en la request para poder accederlo desde cualuier parte
    req.user = payload;
    //Next se utiliza para salir del middleware
    next();
};