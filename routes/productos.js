const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = {dest: './public/tmp'};
const upload = multer(config);
const model = require('./../models/productos');
const service = require('./../services/productos');
const { add } = require('./../models/carrito')


const single = async(req,res) =>{
    const id = req.params.id;
    console.log(id);
    const producto = await model.single2(id);
    console.log(producto);
    res.render('producto',{producto});
}
const comprar = async()=>{
    const id_usuario = req.session.idUser;
    const id = req.params.id;
    const producto = await model.single2(id);
    //consulta sql devuelve SIEMPRE un array de objetos entonces para acceder a un objeto en concreto pongo en este caso producto[0].nombre(porque es un array de objetos)
    console.log(producto[0].nombre);
    const cantidad =  parseInt(req.body.cantidad);
    const obj = {
        id_usuario : id_usuario,
        nombre_producto : producto[0].nombre,
        precio : producto[0].precio * cantidad,
        cantidad : cantidad,
    }
    
    var agregar = await add(obj);
    console.log(agregar);
    res.redirect('/carrito');
}


router.get('/producto/:id', single);
router.post('/producto/:id', comprar);
module.exports = router;