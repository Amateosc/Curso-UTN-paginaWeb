// {usuario : string().required.maxLength(13), password : string().required} me crea valores a seguir para diferentes datos en el programa

const Joi = require('@hapi/joi');

const schemas = {
    auth: Joi.object().keys({
        nombre: Joi.string().required(),
        contra: Joi.string().min(3).max(15).required(),
        
    }),
}

module.exports = {schemas};