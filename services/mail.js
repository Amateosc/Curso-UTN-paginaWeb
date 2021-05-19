const nodemailer = require("nodemailer");

// funciones asincronicas (async-await) las utilizamos cuando necesito ahcer una promesa (consulta uqe puede demorar y me da uno de dos resultas positivo (try) o negativo(catch))

const send = async(obj) => {
    try{
    const transporter = nodemailer.createTransport({
        /*host: 'smtp.gmail.com',
        port: 587,
        secure: false*/
        service: process.env.MAIL_SERVICE,
        auth : {
            user : process.env.MAIL_USER,
            pass : process.env.MAIL_PASSWORD,
        }
    });

    const info = {
        to : obj.mail,
        subject : obj.subject,
        text: obj.text,
        //el mensaje es en html
    }
    const sendMail = await transporter.sendMail(info);
    return sendMail;
    }
    catch(error){
        console.log(error);
    }
}


module.exports = {send}