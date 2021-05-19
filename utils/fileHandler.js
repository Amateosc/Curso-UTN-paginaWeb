const fs = require('fs'); // file system me deja manejarme adentro de la pc
const {v4 : uuid} = require('uuid'); //id unico
const allowExtension = ["png", "jpg"];

const deleteTemp = (file) => fs.unlink(file, e => console.log(e));


const saveFile = ({mimetype, size, path}, extension, destFolder = './public/images') => {
    try{
    const [type, ext] = mimetype.split("/");
    if(!extension.includes(ext)){
        throw new Error("formato incorrecto");
    }
    const uid = uuid();
    const fileName = `${uid}.${ext}`;
    const fileNameOut = `${destFolder}/${fileName}`;
    //leer el archivo y lo escribe en nuestro file name out
    fs.createReadStream(path).pipe(fs.createWriteStream(fileNameOut));
    deleteTemp(path);
    return fileName;
    }
    catch(e){
        console.error(e);
        deleteTemp(path);
    }
}

const imgFile = (file) => saveFile(file, allowExtension);

module.exports = {imgFile}; 