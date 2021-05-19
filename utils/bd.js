const mysql = require("mysql");
const util = require("util");

// consultas en curdo : SELECT * FROM usuarios
// para proyectos mas grandes usamos query builders (knex)
const pool = mysql.createPool({
    host : process.env.BD_HOST || 'localhost',
    port : process.env.BD_PORT || 3306,
    password : process.env.BD_PASSWORD || '',
    user : process.env.BD_USER || 'root',
    database : process.env.BD_NAME || 'pagunaweb',
    connectionLimit : 10 ,// maxima cantidad de conexiones en simultaneo si sobrepasamos 10 se meten las consultaas en una cola FIFO (First In Firts Out)
});
// que es un pool? Es cola de conexiones recurrentes maximo 10 conexiones
// si tengo varias consultas que dependen una de otra sql primero las ejecuta en una especie "cache" si hya un error "vuelve para atras" (rollback) y sino las ejecuta en la pagina. Para esto las querys tiene que ser async.
//pool.query("SELECT * FROM usuarios")

pool.query = util.promisify(pool.query);
//lo convertimos en promise y evita el callback hell

module.exports = pool;