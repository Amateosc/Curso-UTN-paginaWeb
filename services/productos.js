const {create, createimg} = require('./../models/productos'); 
const {imgFile} = require('./../utils/fileHandler');

const createProducto = async(body, file) =>{
  try{
    const {insertId : id_producto} = await create(body);
    const uid = await imgFile(file);
    console.log(uid);
    const obj = {id_producto, uid};
    const {insertId : idFile} = await createimg(obj);
    return idFile;
  }
  catch(e){
      console.error(e);
  }
}


module.exports = {createProducto};