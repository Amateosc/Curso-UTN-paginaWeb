const express = require('express');
const router = express.Router();
const  model = require('../../models/usuarios');
const {verifycreate}=require('./../../midlewares/creausuario');

const all = async(req,res) =>{
    var habilitado = true;
    const usuarios = await model.get(habilitado);
    res.render('tablausuarios', {usuarios});
}
const allfalse = async(req,res) =>{
    var habilitado = false;
    const usuarios = await model.getdesc(habilitado);
    res.render('tablausuarios', {usuarios});
}
const modificar = async(req,res) =>{
    const id = req.params.id;
    const usuario = await model.single(id);
    res.render('modificar', {usuario});
}
const actu = async(req,res)=>{
    const id = req.params.id;
    const obj = {
        nombre : req.body.nombre,
        contra : req.body.contra,
        mail : req.body.mail,
        Admin : req.body.Admin,
    }
    const modificar = await model.actualizar(id, obj);
    res.redirect('/admin/usaurios')
}
const borrar = async(req,res)=> {
    const id = req.params.id;
    const borrado = await model.borrar(id);
    res.redirect('/admin/usuariosadmin');
}
const activ = async(req,res)=>{
    const id = req.params.id;
    const activado = await model.activar(id);
    res.redirect('/admin/usuariosadmin');
}
const convert = async(req,res)=>{
    const id = req.params.id;
    const user = await model.single(id);
    var Admin = 0;
    user.forEach(usuarios => {
        if(usuarios.Admin == 0){
            Admin = 1;
        }
    });
    const convertir = await model.convert(Admin, id);
    res.redirect('/admin/usuariosadmin')
}

router.get('/', all);
router.get('/modificar/:id',modificar);
router.post('/modificar/:id',verifycreate, actu);
router.get('/borrar/:id', borrar);
router.get('/desactivados', allfalse);
router.get('/convert/:id', convert);
router.get('/activar/:id',activ)
module.exports = router;