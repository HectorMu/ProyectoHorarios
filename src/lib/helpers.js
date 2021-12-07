const pool = require('../lib/database')
const bcrypt = require('bcryptjs');

const helpers = {};


helpers.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

helpers.matchPassword = async (password, savedPassword) => {
    try {
        return await bcrypt.compare(password, savedPassword);
    } catch (e) {
        console.log(e)
    }
};

helpers.initialState = async ()=>{
    const usuarios = await pool.query('select * from usuarios')
    //si ya hay usuarios registrados, retorna 
    if(usuarios.length > 0) return
    //si no, has el siguiente codigo para crear un usuario
    try {
        const usuarioInicial = { 
            nombre:'Administrador', 
            correo:'adminSUPP@tecmm.edu.mx', 
            password: process.env.ADMINPASS
        }
        usuarioInicial.password = await helpers.encryptPassword(process.env.ADMINPASS)
        await pool.query('insert into usuarios set ? ',[usuarioInicial])

    } catch (error) {
        console.log(error);
    }
}

helpers.validateExistingEmail = async (email)=>{
    const user = await pool.query('select * from usuarios where correo = ?',[email])
    return user.length > 0 ? true : false;
}


module.exports = helpers;
