//validacion del schema
const { schemas } = require('./../schemas/Users');

 
const verifyLogin = (req, res, next) => {
    //hapi/joi nos retorna un objeto tipo error y uno tipo value
    const {error, value} = schemas.auth.validate(req.body);
    error ? res.status(422).json({error : error.details[0].message}) : next();
}

module.exports = {verifyLogin};