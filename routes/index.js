const express = require('express');
const router = express.Router();
const model = require('./../models/productos');

/* GET home page. */
const all = async (req,res) =>{
  const  productos = await model.get2();
  res.render('index',{productos});
}

const search = (req,res)=>{
  const valor = req.body.search;
  console.log(valor);
  if( valor == "usuarios"){
    res.redirect('./admin/usuariosadmin');
  }  
  if( valor == "productos"){
    res.redirect('/admin/productosadmin');
  }
  else{
    console.log("no coincide con ningun resultado");
    res.redirect('/index');
  }
}
router.get('/', all);
router.post('/search',search);
module.exports = router;
