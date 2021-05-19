const Joi = require('@hapi/joi');
const schemas = {
    auth: Joi.object().keys({
        nombre: Joi.string().required(),
        contra: Joi.string().min(3).max(15).required(),
        mail: Joi.string().min(8).required(),
        Admin: Joi.boolean().min(1).max(1),
    }),
}
module.exports = {schemas};