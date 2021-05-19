const pool = require('./../utils/bd');
const TABLA_PRODUCTOS = "productos";
const TABLA_IMAGENES = "imagenes";

const get2 = async() =>{
    const query = "SELECT p.*, p_i.uid FROM ?? AS p JOIN ?? AS p_i ON p.id = p_i.id_producto";
    const params = [TABLA_PRODUCTOS, TABLA_IMAGENES];
    // la query me devuelve un objeto o conjunto de filas Data Row Package en un [{}]
    const rows = await pool.query(query, params);
    return rows;
}
const single2 = async (id) =>{
    const query = "SELECT p.*, p_i.uid FROM ?? AS p JOIN ?? AS p_i ON p.id = p_i.id_producto WHERE p.id = ?";
    const params = [TABLA_PRODUCTOS, TABLA_IMAGENES, id];
    // la query me devuelve un objeto o conjunto de filas Data Row Package en un [{}]
    const rows = await pool.query(query, params);
    return rows;
}
const create = async(obj)=>{
    const query = "INSERT INTO ?? SET ?";
    const params = [TABLA_PRODUCTOS, obj]
    const rows = await pool.query(query, params);
    return rows;
}
const createimg = async(obj) => {
    pool.query("INSERT INTO ?? SET ?", [TABLA_IMAGENES , obj]).then((result)=> result).catch((e)=> console.log(e));
}
const getdesc = async(habilitado) =>{
    const query = "SELECT id, nombre, habilitado, descripcion, precio FROM ?? WHERE habilitado = false";
    const params = [TABLA_PRODUCTOS, habilitado];
    const rows = await pool.query(query, params);
    return rows;
}
const get = async(habilitado) =>{
    const query = "SELECT id, nombre, habilitado, descripcion, precio FROM ?? WHERE habilitado = true";
    const params = [TABLA_PRODUCTOS, habilitado];
    const rows = await pool.query(query, params);
    return rows;
}


const single = async(id) =>{
    const query = `SELECT id, nombre, habilitado, descripcion, precio FROM ?? WHERE id = ?`;
    const params = [TABLA_PRODUCTOS, id];
    const rows = await pool.query(query, params);
    console.log(rows);
    return rows;
}
const actualizar = async(id, obj) =>{
    const query = 'UPDATE ?? AS us SET ? WHERE us.id = ?'
    const params= [TABLA_PRODUCTOS, obj, id];
    const rows = await pool.query(query,params);
    return rows;
}
const borrar = async(id) =>{
    const query = 'UPDATE ?? AS us SET habilitado = false WHERE us.id = ?'
    const params = [TABLA_PRODUCTOS,id];
    return await pool.query(query, params);
}
const activar = async(id) =>{
    const query = 'UPDATE ?? AS us SET habilitado = true WHERE us.id = ?'
    const params = [TABLA_PRODUCTOS,id];
    return await pool.query(query, params);
}

module.exports = {get2,get, single,single2, create, createimg, borrar, activar,actualizar,getdesc};

