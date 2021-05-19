var express  = require('express');
var router = express.Router();
var model = require('./../models/carrito');

const get = async(req,res)=>{
    const id_usuario = req.session.idUser;
    const carrito = await model.get(id_usuario);
    var precioFinal = 0;
    carrito.forEach(item => {
        precioFinal += item.preico;
    });
    res.render('carrito', {carrito, precioFinal});
}

router.get('/',get);

module.exports = router;