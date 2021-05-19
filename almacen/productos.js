const pool = require('./../utils/bd');
const TABLA_PRODUCTOS = "productos";
const T_PRODUCTOS_IMAGENES = "productos_imagenes";

//reutilizo mi funcion get del otro model y la adapto a mi nueva tabla
const get = async () => {
    const query = "SELECT p.*, p_i.uid FROM ?? AS p JOIN ?? AS p_i ON p.id = p_i.idProducto";
    const params = [TABLA_PRODUCTOS, T_PRODUCTOS_IMAGENES];
    // la query me devuelve un objeto o conjunto de filas Data Row Package en un [{}]
    const rows = await pool.query(query, params);
    return rows;
}

const create = async(obj) => {
    const query = "INSERT INTO ?? SET ?";
    const params = [TABLA_PRODUCTOS, obj]
    const rows = await pool.query(query, params);
    return rows;

}

const single = async(id) => {
    const query = "SELECT p.*, p_i.uid FROM ?? AS p JOIN ?? AS p_i ON p.id = p_i.idProducto WHERE p.id = ?";
    const params = [TABLA_PRODUCTOS, T_PRODUCTOS_IMAGENES, id];
    // la query me devuelve un objeto o conjunto de filas Data Row Package en un [{}]
    const rows = await pool.query(query, params);
    return rows;
}

const createImg = async(obj) => {
    pool.query("INSERT INTO ?? SET ?", [T_PRODUCTOS_IMAGENES, obj]).then((response) => response).catch((e) => console.log(e));

}


module.exports = {get, create, createImg, single}