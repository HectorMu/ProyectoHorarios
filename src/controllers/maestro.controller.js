const pool = require('../lib/database')
class MaestroController {
  async List(req, res) {
    try {

      const maestros = await pool.query('select * from maestros')
      res.render("maestros/maestros", { maestros });
    } catch (error) {
      console.log(error);
      res.render("Maestros/maestros");
    }
  }

  RenderInsert(req, res) {
    res.render("Maestros/add");
  }

  async Insert(req, res) {
    try {
      const { nombre, academia } = req.body;
      const nuevoMaestro = { nombre, academia }
      await pool.query('insert into maestros set ?', [nuevoMaestro])
      req.flash("success", "Se agrego el maestro correctamente");
      res.redirect("/maestros");
    } catch (error) {
      console.log(error);
      req.flash("message", error);
      res.redirect("/maestros/add");
    }
  }

  async RenderEdit(req, res) {
    const { id } = req.params;
    try {
      const maestro = await pool.query('select * from maestros where id = ?', [id])
      res.render("maestros/editarM", { m: maestro[0] });
    } catch (error) {
      console.log(error);
      res.render("Maestros/editarM");
    }
  }

  //Metodo para editar
  async Edit(req, res) {
    const { id } = req.params;
    try {
      const { nombre, academia } = req.body;
      const maestroEditado = { ...req.body }
      await pool.query('update maestros set ?  where id = ?',[maestroEditado,id])
      req.flash(
        "success",
        "Los datos del maestro se actualizaron correctamente")
      res.redirect("/maestros");

    } catch (error) {
      req.flash("message", "Ocurrio un error, intentalo de nuevo");
      res.redirect("/maestros/editarM/" + id);
    }
  }

  //Buscar
  async Buscar(req, res) {
    try {
      const { txtBuscar } = req.body;
      const maestros = await pool.query(`select * from maestros where nombre like '%${txtBuscar.toLowerCase()}%'`)
      res.render("maestros/maestros", { maestros });
    } catch (error) {
      console.log(error);
      res.render("Maestros/maestros");
    }
  }

  async Eliminar(req, res) {
    try {
      const { id } = req.params;
      await pool.query('delete from horarios where fk_maestro = ?',[id])
      await pool.query('delete from maestros where id = ?',[id])
      res.redirect("/maestros");
    } catch (error) {
      req.flash("message", "El maestro no fue eliminado, vuelva a intentarlo");
      res.redirect("/maestros");
    }
  }
}

module.exports = MaestroController;
