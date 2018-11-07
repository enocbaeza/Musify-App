'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_enoc';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        image: user.image,
        //fecha creacion token 
        iat: moment().unix(),
        //fecha expiracion token
        exp: moment().add(30, 'days').unix()
    }
    //devuelve el token encriptado
    return jwt.encode(payload, secret);
};