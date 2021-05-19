const pool = require('./../utils/bd');
const T_CARRITO = "carrito";



const get = async(id_usuario) => {
    const query = "SELECT * FROM ?? WHERE id_usuario = ?";
    const params = [T_CARRITO, id_usuario];
    return await pool.query(query, params);
}

const add = async(obj) => {
    const query = "INSERT INTO ?? SET ?"
    const params = [T_CARRITO, obj];
    return await pool.query(query, params);
}

module.exports = {get, add};