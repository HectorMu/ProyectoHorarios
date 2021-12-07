const pool = require('../lib/database')

class HorariosController {
  async List(req, res) {
    try {
      const maestros = await pool.query('select * from maestros')
      res.render("horarios/horarios", { maestros });
    } catch (error) {
      console.log(error);
      res.render("horarios/horarios");
    }
  }

  //Abrir el formulario de agregar
  async RenderInsert(req, res) {
    try {
      const API =
        "https://api-horariomaestros.azurewebsites.net/Principal/BuscarMaestro";
      const responseM = await fetch(API);
      const Maestros = await responseM.json();
      res.render("horarios/add", { Maestros });
    } catch (error) {
      console.log(error);
      res.render("horarios/add");
    }
  }

  //Insertar en la api
  async Insert(req, res) {
    const { Dia, RangoHora, Ubicacion, Maestro } = req.body;

    const API = `https://api-horariomaestros.azurewebsites.net/Principal/AlmacenarHorario?Dia=${Dia}&RangoHora=${RangoHora}&Ubicacion=${Ubicacion}&Maestro=${Maestro}`;
    const response = await fetch(API);
    const data = await response;

    if (data.statusText === "OK") {
      req.flash("success", "Se agrego correctamente");
      res.redirect("/horarios");
    } else {
      req.flash("message", "Error al guardar el horario");
      res.redirect("/horarios/add");
    }
  }

  async Buscar(req, res) {
    try {
      const { txtBuscar } = req.body;

      const API ="https://api-horariomaestros.azurewebsites.net/Principal/BuscarMaestroCompleto?nombre=";
      const response = await fetch(API);
      const data = await response.json();
      const maestros = data.filter(m =>
        m.nombre.toLowerCase().includes(txtBuscar.toLowerCase())
      )
      res.render("horarios/horarios", { maestros });
    } catch (error) {
      console.log(error);
      res.render("horarios/horarios", { horarios });
    }
  }
  async RenderEdit(req, res) {
    try {
      const { id } = req.params;
      const APIM =
        "https://api-horariomaestros.azurewebsites.net/Principal/BuscarMaestro";
      const responseM = await fetch(APIM);
      const Maestros = await responseM.json();

      const API =
        "https://api-horariomaestros.azurewebsites.net/Principal/BuscarHorario?nombre=";
      const response = await fetch(API);
      const Horarios = await response.json();

      const Horario = Horarios.filter((h) => h.id == id);
      res.render("horarios/editarh", { h: Horario[0], Maestros });
    } catch (error) {
      console.log(error);
      res.render("horarios/editarh");
    }
  }

  async Edit(req, res) {
    try {
      const { id } = req.params;
      const { Dia, RangoHora, Ubicacion, fk_maestro } = req.body;
      const API = `https://api-horariomaestros.azurewebsites.net/Principal/ActualizarHorario?Id=${id}&Dia=${Dia}&RangoHora=${RangoHora}&Ubicacion=${Ubicacion}&Maestro=${fk_maestro}`;
      const response = await fetch(API);
      const data = await response;
      
      if (data.statusText == "OK") {
        req.flash(
          "success",
          "Los datos del horario se actualizaron correctamente"
        );
        res.redirect("/horarios");
      } else {
        req.flash(
          "message",
          "Ocurrio un error al actualizar, intentalo de nuevo"
        );
        res.render("horarios/editarh" + id);
      }
    } catch (error) {
      req.flash("message", "Ocurrio un error, intentalo de nuevo");
      res.render("horarios/editarh" + id);
    }
  } //ELiminar

  async EliminarH(req, res) {
    try {
      const { id } = req.params;
      const API = `https://api-horariomaestros.azurewebsites.net/Principal/EliminarHorario?Id=${id}`;
      const response = await fetch(API);
      const data = await response;
      req.flash("success", "El Horario fue eliminado con exito");
      res.redirect("/horarios/");
    } catch (error) {
      req.flash("message", "El Horario no fue eliminado, vuelva a intentarlo");
      res.redirect("/horarios/");
    }
  }
  async RenderScheduleChoosing (req, res){
    const { id } = req.params;
    try {
      const Maestro = await pool.query('select * from maestros where id = ?',[id])
      res.render("horarios/horarioPorMaestro", { Maestro: Maestro[0].nombre});
    } catch (error) {
      console.log(error)
    }
  }
   async listPublicSchedules (req, res) {
    try {
      const maestros = await pool.query('select * from maestros')
      res.render("horarios/horariosPublicos", { maestros });
    } catch (error) {
      console.log(error);
      res.render("horarios/horariosPublicos");
    }
  }
  async searchPublicSchedules (req, res){
    try {
      const { txtBuscar } = req.body;

      const API ="https://api-horariomaestros.azurewebsites.net/Principal/BuscarMaestroCompleto?nombre=";
      const response = await fetch(API);
      const data = await response.json();
      const maestros = data.filter(m =>
        m.nombre.toLowerCase().includes(txtBuscar.toLowerCase())
      )
      res.render("horarios/horariosPublicos", { maestros });
    } catch (error) {
      console.log(error);
      res.render("horarios/horariosPublicos", { horarios });
    }
  }
  async renderPublicTeacherSchedule (req, res){
    const { id } = req.params;
    try {
      const Maestro = await pool.query('select * from maestros where id = ?',[id])
      res.render("horarios/horariosPublicosPorMaestro", { Maestro: Maestro[0].nombre});
      
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = HorariosController;
