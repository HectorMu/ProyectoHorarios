const pool = require('../lib/database')
const helpers = require('../lib/helpers')
class AdministradorController {
  //Listado de Usuarios
  async List(req, res) {
    try {
      const usuarios = await pool.query('select * from usuarios')
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
      const { nombre, correo, password } = req.body;
      const validateEmail = await helpers.validateExistingEmail(correo)
      console.log(validateEmail)
      if(validateEmail){
        req.flash("message", `El correo ${correo} ya esta registrado, intenta con otro`);
        res.redirect("/administradores/add");
        return 
      }
      const nuevoUsuario = { nombre, correo, password }
      nuevoUsuario.password = await helpers.encryptPassword(password)
      await pool.query('insert into usuarios set ?',[nuevoUsuario])
      req.flash("success", "Usuario añadido exitosamente");
      res.redirect("/administradores");
     
    } catch (error) {
      console.log(error);
      req.flash("message", "Hubo un error");
      res.redirect("/administradores/add");
    }
  }

  //renderizareditar
  async RenderEdit(req, res) {
    const { id } = req.params;
    try {
      const administrador = await pool.query('select * from usuarios where id= ?',[id])
      res.render("administradores/edit", { a: administrador[0] });
    } catch (error) {
      console.log(error);
      res.render("administradores/edit");
    }
  }

  //Método editar
  async Edit(req, res) {
    const { id } = req.params;
    try {
     
      const { nombre, correo, password } = req.body;
      const usuarioEditado = { nombre, correo, password }
      usuarioEditado.password = await helpers.encryptPassword(password)
      await pool.query('update usuarios set ? where id = ?',[usuarioEditado, id])
      req.flash('success', 'Los datos del usuario se actualizaron correctamente')
      res.redirect("/administradores")
    } catch (error) {
      console.log(error)
      req.flash("message", "Hubo un error");
      res.redirect("/administradores/edit/" + id);
    }
  }

  //buscar
  async Buscar(req, res) {
    try {
      const { txtBuscar } = req.body;
      const usuarios = await pool.query(`select * from usuarios where nombre like '%${txtBuscar.toLowerCase()}%'`)
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
      await pool.query('delete from usuarios where id = ?',[id])
      req.flash("success", "Se eliminó el usuario");
      res.redirect("/administradores");
    } catch (error) {
      req.flash("message", "Hubo un error al eliminar");
      res.redirect("/administradores")
    }
  }
}

module.exports = AdministradorController;
