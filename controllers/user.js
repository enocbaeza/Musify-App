'use strict'

var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');

function prueba(req, res){
    res.status(200).send({
        message: 'Test metodo'
    });
}

function saveUser(req, res){
    var user = new User();
    var params = req.body;
    
    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'USER_ROLE';
    user.image = 'NULL';

    if(params.password){
        //encriptar contraseña
        bcrypt.hash(params.password, null, null, (err,hash) => {
            user.password = hash;
            if(user.name && user.surname && user.email){
                //Save user
                user.save((err, userStored) => {
                    if(err){
                        res.status(500).send({message:'Error al guardar el usuario'});
                    } else{
                        res.status(200).send({message:'Usuario guardado correctamente', user: userStored});
                    }
                });
            } else{
                res.status(200).send({message:'Introduce todos los campos'});
            }
        });
    } else{
        res.status(200).send({message:'Introduce la contraseña'});
    }
}

function login(req, res){
    //Con el modulo bodyParser, los parametros que llegan por POST
    //se transforman automaticamente en un objeto JSON
    var params = req.body;
    
    if(params.email && params.password){
        var email = params.email;
        var password = params.password;
        
        //A traves del ORM Moongose llamamos al metodo findOne() de mongo
        User.findOne({email: email.toLowerCase()}, (err, user) => {
            if(err){
                res.status(500).send({message:'Error en request'});
            } else{
                if(!user){
                    res.status(404).send({message:'Usuario no existe'});
                } else{
                    //Validar usuario
                    bcrypt.compare(password, user.password, (err, check) => {
                        if(check){
                            if(params.gethash){
                                //Devuelve token jwt
    
                            } else{
                                //Devuelve usuario logeuado
                                res.status(200).send({message:'Usuario logueado correctamente', user});
                            }
                        } else{
                            res.status(200).send({message:'Contraseña incorrecta'});
                        }
                    });
                }
            }
        });
    } else{
        res.status(200).send({message:'Introduce todos los campos'});
    }
}

module.exports = {
    prueba,
    saveUser, 
    login
};