const pool = require('./../utils/bd');
T_SUCURSAL = "sucursal";


const get = async () => {
    const query = "SELECT suc.id, suc.nombre FROM ?? AS suc";
    const params = [T_SUCURSAL];
    // la query me devuelve un objeto o conjunto de filas Data Row Package en un [{}]
    const rows = await pool.query(query, params);
    return rows;
}


module.exports = {get};