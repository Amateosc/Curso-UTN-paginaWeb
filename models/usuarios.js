const pool = require('./../utils/bd');
const TABLA_USUARIOS = "usuarios"

const create = async(obj) => {
    pool.query("INSERT INTO ?? SET ?", [TABLA_USUARIOS , obj]).then((result)=> result).catch((e)=> console.log(e));
}
const getdesc = async(habilitado) =>{
    const query = "SELECT id, nombre, habilitado, mail, Admin FROM usuarios WHERE habilitado = false";
    const params = [TABLA_USUARIOS, habilitado];
    const rows = await pool.query(query, params);
    return rows;
}
const get = async(habilitado) =>{
    const query = "SELECT id, nombre, habilitado, mail, Admin FROM usuarios WHERE habilitado = true";
    const params = [TABLA_USUARIOS, habilitado];
    const rows = await pool.query(query, params);
    return rows;
}
const update = async({data, uid}) => {
    const query = "UPDATE ?? SET ? WHERE confirmacionCorreo = ?";
    const params = [TABLA_USUARIOS, data, uid];
    return await pool.query(query, params);
}

const single = async(id) =>{
    const query = `SELECT id, nombre, habilitado, contra, mail, Admin FROM ?? WHERE id = ?`;
    const params = [TABLA_USUARIOS, id];
    const rows = await pool.query(query, params);
    console.log(rows);
    return rows;
}
const actualizar = async(id, obj) =>{
    const query = 'UPDATE ?? AS us SET ? WHERE us.id = ?'
    const params= [TABLA_USUARIOS, obj, id];
    const rows = await pool.query(query,params);
    return rows;
}
const borrar = async(id) =>{
    const query = 'UPDATE ?? AS us SET habilitado = false WHERE us.id = ?'
    const params = [TABLA_USUARIOS,id];
    return await pool.query(query, params);
}
const activar = async(id) =>{
    const query = 'UPDATE ?? AS us SET habilitado = true WHERE us.id = ?'
    const params = [TABLA_USUARIOS,id];
    return await pool.query(query, params);
}

const iniciar = async() =>{
    const query = "SELECT  nombre, contra, Admin, habilitado FROM usuarios WHERE habilitado = true";
    const params = [TABLA_USUARIOS];
    return await pool.query(query,params);
}
const convert = async(Admin,id)=>{
    const query = "UPDATE ?? SET Admin = ? WHERE id = ?";
    const params = [TABLA_USUARIOS, Admin, id];
    return await pool.query(query, params);
}
const login = async ({nombre, contra}) =>{
    try{
        const query = "SELECT id, Admin FROM ?? WHERE nombre = ? AND contra = ?";
        const params = [TABLA_USUARIOS,nombre, contra];
        const rows =  await pool.query(query, params);
        console.log(nombre, contra);
        return rows; 
    }
    catch(e){
        console.log(e);
    }
}
module.exports = {actualizar, create, get, single, update, borrar,getdesc, iniciar, convert, login, activar};