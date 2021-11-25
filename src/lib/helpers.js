const bcrypt = require('bcryptjs');
const { options } = require('../routes/index.route');

const helpers = {};
const fetch = require("node-fetch");

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
    const response = await fetch('https://api-horariomaestros.azurewebsites.net/Principal/ConsultarUsuarios')
    const usuarios = await response.json()
    //si ya hay usuarios registrados, retorna 
    if(usuarios.length > 0) return
    //si no, has el siguiente codigo para crear un usuario
    try {
        const usuarioInicial = { 
            usuario:'admin', 
            nombre:'supervisor', 
            correo:'adminSUPP@tecmm.edu.mx', 
            password: process.env.ADMINPASS
        }
        usuarioInicial.password = await helpers.encryptPassword(process.env.ADMINPASS)
        const API = `https://api-horariomaestros.azurewebsites.net/Principal/AlmacenarUsuario
        ?Usuario=${usuarioInicial.usuario}
        &Nombre=${usuarioInicial.nombre}
        &Correo=${usuarioInicial.correo}
        &Password=${usuarioInicial.password}`;

        const response = await fetch(API);
        const data = await response;
        return data.statusText === "Ok" ? console.log('Usuario inicial creado') : console.log('Hubo un error al crear el usuario inicial')

    } catch (error) {
        console.log(error);
    }
}

helpers.validateExistingEmail = async (email)=>{

    const response = await fetch('https://api-horariomaestros.azurewebsites.net/Principal/ConsultarUsuarios')
    const usuarios = await response.json()
    const usuario = usuarios.filter(u => u.correo ==  email);
    console.log(usuario)
    return usuario.length > 0 ? true : false;
}


module.exports = helpers;
