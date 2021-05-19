const pool = require("./../utils/bd"); // referencia de la conexion
const TABLA_EMPLEADOS = "empleados";
const TABLA_SUCURSAL = "sucursal";


//select a la BD

const get = async (habilitado) => {
    const query = "SELECT emp.id, emp.nombre, emp.apellido, suc.nombre as nombreSucursal FROM ?? as emp JOIN ?? as suc ON emp.id_sucursal = suc.id WHERE emp.habilitado = ?";
    const params = [TABLA_EMPLEADOS, TABLA_SUCURSAL, habilitado];
    // la query me devuelve un objeto o conjunto de filas Data Row Package en un [{}]
    const rows = await pool.query(query, params);
    return rows;
}
const single = async (id) =>{
    const query = `SELECT emp.*, suc.nombre as nombreSucursal FROM ?? as emp JOIN ?? as suc ON emp.id_sucursal = suc.id WHERE emp.id = ? AND emp.habilitado = true`;
    const params = [TABLA_EMPLEADOS, TABLA_SUCURSAL, id];
    const rows = await pool.query(query, params);
    console.log(rows);
    return rows;
}

const create = async(obj) => {
    const query = `INSERT INTO ?? SET ?`;
    const params = [TABLA_EMPLEADOS, obj];
    const rows = await pool.query(query,params);
    return rows;
}

const update = async(id, obj) => {
    const query = `UPDATE ?? AS emp SET ? WHERE emp.id = ?`;
    const params = [TABLA_EMPLEADOS, obj, id];
    const rows = await pool.query(query,params);
    return rows;
}
const borrar = async(id, habilitado) => {
    const query = `UPDATE ?? AS emp SET habilitado = ? WHERE emp.id = ?`;
    const params = [TABLA_EMPLEADOS, habilitado, id];
    return await pool.query(query, params);
}


module.exports = {get, single, create, update, borrar};