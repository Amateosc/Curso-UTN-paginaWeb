const { schemas } = require('./../schemas/Users');
const verifycreate = (req, res, next) => {
    //hapi/joi nos retorna un objeto tipo error y uno tipo value
    const {error, value} = schemas.auth.validate(req.body);
    error ? res.status(422).json({error : error.details[0].message}) : next();
}
module.exports = {verifycreate};