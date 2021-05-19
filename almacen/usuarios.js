const pool = require("./../utils/bd"); 
const TABLA_USUARIOS = "usuarios"

const get = async(habilitado) => {
    const query = "SELECT id, user, pass, admin FROM ?? WHERE habilitado = ?";
    const params = [TABLA_USUARIOS, habilitado];
    return await pool.query(query, params);
}
const update = async({data, uid}) => {
    const query = "UPDATE ?? SET ? WHERE confirmacionCorreo = ?";
    const params = [TABLA_USUARIOS, data, uid];
    return await pool.query(query, params);
}
const single = async(id) => {
    const query ="SELECT user, pass FROM ?? WHERE id = ?";
    const params= [TABLA_USUARIOS, id];
    return await pool.query(query, params);
}
const convert = async(admin, id) => {
    const query = "UPDATE ?? SET admin = ? WHERE id = ?";
    const params = [TABLA_USUARIOS, admin, id];
    return await pool.query(query, params);
}
const auth = async ({user, pass}) => {
    try {
    const query = "SELECT id, admin FROM ?? WHERE user = ? AND pass = ?";
    const params = [TABLA_USUARIOS, user, pass];
    return await pool.query(query, params);
    }
    catch(e){
        console.log(e);
    }
}


const create = (obj) => {
    pool.query("INSERT INTO ?? SET ?", [TABLA_USUARIOS, obj]).then((result)=> result).catch((e)=> console.log(e));
}

module.exports = {get, single, convert, create, auth, update};