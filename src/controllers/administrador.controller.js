const fetch = require("node-fetch");
const helpers = require('../lib/helpers')
class AdministradorController {
  //Listado de Usuarios
  async List(req, res) {
    try {
      const response = await fetch(
        "https://api-horariomaestros.azurewebsites.net/Principal/ConsultarUsuarios"
      );
      const usuarios = await response.json();
      res.render("administradores/administradores", { usuarios });
    } catch (error) {
      console.log(error);
      res.render("administradores/administradores");
    }
  }
  //Renderiza el la pestaña para añadir usuarios
  RenderInsert(req, res) {
    res.render("administradores/add");
  }

  //Insertar usuario en la API
  async Insert(req, res) {
    try {
      const { usuario, nombre, correo, password } = req.body;

      const validateEmail = await helpers.validateExistingEmail(correo)
      console.log(validateEmail)
      if(validateEmail){
        req.flash("message", `El correo ${correo} ya esta registrado, intenta con otro`);
        res.redirect("/administradores/add");
        return 
      }
      const nuevoUsuario = { usuario, nombre, correo, password }
      nuevoUsuario.password = await helpers.encryptPassword(password)
      const API = `https://api-horariomaestros.azurewebsites.net/Principal/AlmacenarUsuario?Usuario=${nuevoUsuario.usuario}&Nombre=${nuevoUsuario.nombre}&Correo=${nuevoUsuario.correo}&Password=${nuevoUsuario.password}`;
      const response = await fetch(API);
      const data = await response;


      //NOTA: las apis de ASP.NET retornan un estatus en texto.... Entonces asi se haria esta validacion
      console.log(data.statusText);
      if (data.statusText === "OK") {
        req.flash("success", "Usuario añadido exitosamente");
        res.redirect("/administradores");
      } else {
        req.flash("message", "Hubo un error al añadir al usuario");
        res.redirect("/administradores");
      }
    } catch (error) {
      console.log(error);
      req.flash("message", "Hubo un error");
      res.redirect("/administradores/add");
    }
  }

  //renderizareditar
  async RenderEdit(req, res) {
    try {
      const { id } = req.params;
      const API = "https://api-horariomaestros.azurewebsites.net/Principal/ConsultarUsuarios";
      const response = await fetch(API);
      const administradores = await response.json();
      console.log(administradores);
      const administrador = administradores.filter((a) => a.id == id);

      res.render("administradores/edit", { a: administrador[0] });
    } catch (error) {
      console.log(error);
      res.render("administradores/edit");
    }
  }

  //Método editar
  async Edit(req, res) {
    try {
      const { id } = req.params;
      const { usuario, nombre, correo, password } = req.body;
      
      const usuarioEditado = { usuario, nombre, correo, password }
      usuarioEditado.password = await helpers.encryptPassword(password)

      const API = `https://api-horariomaestros.azurewebsites.net/Principal/ActualizarUsuario?Id=${id}&Usuario=${usuarioEditado.usuario}&Nombre=${usuarioEditado.nombre}&Correo=${usuarioEditado.correo}&Password=${usuarioEditado.password}`;
      const response = await fetch(API);
      const data = await response;
      console.log(data.statusText);
      if (data.statusText == 'OK') {
        req.flash('success', 'Los datos del usuario se actualizaron correctamente')
        res.redirect("/administradores")
      } else {
        req.flash('message', 'Ocurrio un error al actualizar, intentalo de nuevo')
        res.redirect("/administradores/edit/" + id)
      }
    } catch (error) {
      req.flash("message", "Hubo un error");
      res.redirect("/administradores/edit/" + id);
    }
  }

  //buscar
  async Buscar(req, res) {
    try {
      const { txtBuscar } = req.body;

      const API = "https://api-horariomaestros.azurewebsites.net/Principal/ConsultarUsuarios";
      const response = await fetch(API);
      const usu = await response.json();

      const usuarios = usu.filter((a) => a.nombre.toLowerCase().includes(txtBuscar.toLowerCase()));

      console.log(usuarios);

      res.render("administradores/administradores", { usuarios });
    } catch (error) {
      console.log(error);
      res.render("administradores/administradores");
    }
  }

  //eliminar
  async Eliminar(req, res) {
    try {
      const { id } = req.params;
      const API = `https://api-horariomaestros.azurewebsites.net/Principal/EliminarUsuario?Codigo=${id}`
      const response = await fetch(API);
      const data = await response;

      req.flash("success", "Se eliminó el usuario");
      res.redirect("/administradores");
    } catch (error) {
      req.flash("message", "Hubo un error al eliminar");
      res.redirect("/administradores")
    }
  }
}

module.exports = AdministradorController;
