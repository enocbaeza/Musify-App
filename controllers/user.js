'use strict'

function prueba(req, res){
    res.status(200).send({
        message: 'Test metodo'
    });
}

module.exports = {
    prueba
};