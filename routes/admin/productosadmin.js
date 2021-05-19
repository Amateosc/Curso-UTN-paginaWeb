const express = require('express');
const router = express.Router();
const multer = require('multer');
const config = {dest: './public/tmp'};
const upload = multer(config);
const model = require('./../../models/productos');
const service = require('./../../services/productos');

const create = async(req,res) =>{
    const idFile = await service.createProducto(req.body, req.file);
    console.log(req.file);
    res.render("crearproducto");
} 
const all = async(req,res) =>{
    var habilitado = true;
    const productos = await model.get(habilitado);
    console.log(productos);
    res.render('tablaproductos', {productos});
}
const allfalse = async(req,res) =>{
    var habilitado = false;
    const productos = await model.getdesc(habilitado);
    res.render('tablaproductos', {productos});
}
const modificar = async(req,res) =>{
    const id = req.params.id;
    const productos = await model.single(id);
    res.render('modificarproducto', {productos});
}
const actu = async(req,res)=>{
    const id = req.params.id;
    const obj = {
        nombre : req.body.nombre,
        precio : req.body.precio,
        descripcion : req.body.descripcion,
    }
    const modificar = await model.actualizar(id, obj);
    res.redirect('/admin/productos')
}
const borrar = async(req,res)=> {
    const id = req.params.id;
    const borrado = await model.borrar(id);
    res.redirect('/admin/productosadmin');
}
const activ = async(req,res)=>{
    const id = req.params.id;
    const activado = await model.activar(id);
    res.redirect('/admin/productosadmin');
}

router.get('/', all);
router.get('/modificar/:id',modificar);
router.post('/modificar/:id', actu);
router.get('/borrar/:id', borrar);
router.get('/desactivados', allfalse);
router.get('/activar/:id',activ);
router.get('/create', (req,res)=> res.render("crearproducto"));
router.post('/create', upload.single("imagen"),create);


module.exports = router;