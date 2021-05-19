const express = require('express');
const router = express.Router();
const model = require("./../models/usuarios");
const {login} = require("./../models/usuarios");
const sha1 = require('sha1');
const { verifyLogin } = require('./../midlewares/users');
const { verifycreate  } = require('./../midlewares/creausuario');
const { send } = require('./../services/mail');
const { v4 : uuid } = require('uuid'); 

const create = async(req,res) => {
    req.body.pass = sha1(req.body.contra);
    const obj = {
        nombre : req.body.nombre,
        contra : req.body.contra,
        mail : req.body.mail,
        confirmacionCorreo : uuid(),
    }
    console.log(obj)
    var newUser = await model.create(obj);
    const mailinfo = {
        mail : obj.mail,
        message : `
        <h2>Gracias por registrarte ${obj.nombre}</h2>
        <h3>No olvides verificar tu cuenta para seguir </h3>
        <a href=${process.env.URL_SERVER}:${process.env.PORT}/registro/verify?uid=${obj.confirmacionCorreo}>Verificacion de correo </a>
      `
    }
    console.log(mailinfo)
    const mail = await send(obj);
    res.render('index',{message: "Usuario creado! Se envio un mail de confirmacion a tu casilla!"});
}

const log = async(req,res)=>{
    try{
        req.body.contra = sha1(req.body["contra"]);
    var obj = req.body;
    var result= await login(obj);
    console.log(result);
    if(result.lenght == 0){
        res.render('usuarios',{message: 'usuarios o pass incorrectos'})
    }
    const [{id, Admin}] = result
    console.log(id,Admin);
    req.session.idUser = id;
    req.session.admin = Admin;
    res.render('index');
    }
    catch(e){
        console.log(e);
    }
}
const verifyEmail = async (req, res) => {
    try {
      const { uid } = req.query;
      await model.update({ data: { habilitado: 1 }, uid });
      res.redirect("/index");
    } catch (e) {
      console.error(e);
    }
  };

router.get('/',  (req,res) => res.render('usuarios')); 
router.post('/log',verifyLogin,log);
router.post('/create',verifycreate, create);
router.get('/create', create);
router.get('/verify', verifyEmail);

module.exports = router;